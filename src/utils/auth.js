import * as jwt from 'jsonwebtoken';
import { OAuth2PopupFlow } from 'oauth2-popup-flow';

Object.defineProperties(OAuth2PopupFlow.prototype, {
    _rawTokenPayload: {
        get: function _rawTokenPayload() {
            const rawToken = this._rawToken;
            if (!rawToken) return undefined;
    
            return jwt.decode(rawToken);
        }
    },
    handleRedirect: {
        value: async function() {
            const params = new URLSearchParams(window.location.search);

            const res = await fetch(process.env.GATSBY_AUTH_SERVER + '?' + params)
            const { user, token } = await res.json();
            if (res.status === 200) {
                this._rawToken = token;
                this.storage.setItem('user', JSON.stringify(user));
                return 'SUCCESS';
            } else {
                return `CODE-${res.status}`;
            }
                
        }
    },
    loggedIn: {
        value: function() {
            if (typeof window === 'undefined') return false

            const decodedPayload = this._rawTokenPayload;
            if (!decodedPayload) return false;
        
            if (this.tokenValidator) {
              const token = this._rawToken;
              if (!this.tokenValidator({ payload: decodedPayload, token }))
                return false;
            }
    
            return !this.tokenExpired();
        }
    },
    tokenExpired: {
        value: function() {
            const decodedPayload = this._rawTokenPayload;
            if (!decodedPayload) return false;
        
            const exp = decodedPayload.exp;
            if (!exp) return false;
        
            if (Date.now() <= exp * 1000) return false;
            return true;
        }
    },
    user: {
        get: function() {
            const user = this.storage.getItem('user')
            return user && user !== 'undefined' ? JSON.parse(user) : null
        }
    }
})


export const auth = new OAuth2PopupFlow({
    authorizationUri: 'https://discordapp.com/api/oauth2/authorize',
    clientId: process.env.GATSBY_DISCORD_CLIENT_ID,
    storage: typeof window === 'undefined' ? {} : window.localStorage,
    redirectUri: process.env.GATSBY_DISCORD_CALLBACK_URI,
    responseType: 'code',
    scope: 'identify email guilds',
    additionalAuthorizationParameters: {
        state: Math.random().toString(),
        prompt: 'none'
    }
})

auth.addEventListener('login', console.log)
auth.addEventListener('logout', console.log)