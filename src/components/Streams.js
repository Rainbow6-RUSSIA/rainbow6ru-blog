import { faMixer, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useState } from 'react'
import { isMobile } from 'react-device-detect'

let Player = null

const Link = ({ platform, name, children, ...args }) => {
    const url = 
        platform === 'twitch' ? `https://twitch.tv/${name}` :
        platform === 'mixer' ? `https://mixer.com/${name}` : ''
    return <a {...args} href={url}>{children}</a>
}

const Icon = ({ platform }) => {
    return platform === 'twitch' ? <FontAwesomeIcon style={{ color: '#6441A4', height: '1em', width: '1em' }} icon={faTwitch} /> :
        platform === 'mixer' ? <FontAwesomeIcon style={{height: '1em', width: '1em' }} icon={faMixer} /> : null
}

const Stream = ({ item }) => (
    <article className="column">
        <Link className="title" {...item}>
            <Icon platform={item.platform} />
            <span>{item.name}</span>
        </Link>
        <Player className="subtitle" {...item}/>
    </article>
)

const SimpleStream = ({ item }) => (
    <article className="column">
        <Link className="title" {...item}>
            <Icon platform={item.platform} />
            <span>{item.name}</span>
        </Link>
        <div className="player-stub" style={{ backgroundImage: `url(${item.bannerUrl})` }}>
            <span>
                <Link {...item}>
                    <FontAwesomeIcon style={{height: '3em', width: '3em' }} icon={faExternalLinkAlt}/>
                </Link>
                <p>{item.online ? null : 'НЕ В СЕТИ'}</p>
            </span>
        </div>
    </article>
)

const Loading = () => (
    <article className="column">
        <div>
            <FontAwesomeIcon style={{height: '3em', width: '3em' }} icon={faSpinner} spin/>
        </div>
    </article>
)

async function fetchMixer(channels) {
    channels = channels.filter(s => s.platform === 'mixer').map(s => s.name)
    if (!channels.length) { return [] }
    const res = await fetch(`https://mixer.com/api/v1/channels?fields=token,online,bannerUrl,viewersCurrent,type&where=token:in:${channels.join(';')}`, {
        headers: { 'Client-ID': process.env.GATSBY_MIXER_CLIENT_ID }
    }) 
    const data = await res.json();
    console.log('Mixer', data)

    return data.map(d => ({
        name: d.token,
        platform: 'mixer',
        online: d.online,
        bannerUrl: d.bannerUrl,
        viewersCount: d.viewersCurrent,
        game: d.type.id === process.env.GATSBY_MIXER_SIEGE_ID
    }))
}

async function fetchTwitch(channels) {
    channels = channels.filter(s => s.platform === 'twitch').map(s => s.id)
    if (!channels.length) { return [] }
    const res = await fetch(`https://api.twitch.tv/kraken/streams/?channel=${channels.join(',')}`, {
        headers: {
            'Client-ID': process.env.GATSBY_TWITCH_CLIENT_ID,
            'Accept': 'application/vnd.twitchtv.v5+json'
        }
    }) 
    const { streams } = await res.json();
    console.log('Twitch', streams);
    
    return streams.map(d => ({
        id: d._id,
        name: d.channel.display_name,
        platform: 'twitch',
        online: d.stream_type === 'live',
        bannerUrl: d.preview.medium,
        viewersCount: d.viewers,
        game: d.game === process.env.GATSBY_TWITCH_SIEGE_ID
    }))
}

const PreviewWrapper = ({ items, preview }) => {
    if (preview || typeof window === 'undefined') {
        return (
            <div className="columns streams">
                {items.map(i => <SimpleStream key={i.id} item={i} />)}
            </div>
        )
    } else {
        return <Streams items={items} />
    }
}

const reducer = (state, action) => {
    switch (true) {
        case typeof action === 'string': return state.map(i => i.platform === action ? {...i, fetched: true} : i)
        case Array.isArray(action): return state.map(i => ({ ...i, ...action.find(r => r.name === i.name && r.platform === i.platform) }))
    }
}

const Streams = ({ items }) => {

    const [state, dispatch] = useReducer(reducer, items.map(i => ({...i, fetched: false})))
    const [playerLoaded, setLoaded] = useState(false)
    
    useEffect(() => {
        import("./Player")
            .then(module => {
                Player = module.default;
                setLoaded(true)
                fetchMixer(state).then(dispatch).finally(() => dispatch('mixer'))
                fetchTwitch(state).then(dispatch).finally(() => dispatch('twitch'))
            })
    }, [])

    return (
        <div className="columns streams"> {/* Rework to columns */}
            {state.map(i => 
                playerLoaded && !i.fetched
                    ? <Loading key={i.id} />
                    : i.online
                        ? isMobile
                            ? <SimpleStream key={i.id} item={i} />
                            : <Stream key={i.id} item={i} />
                        : i.show
                            ? <SimpleStream key={i.id} item={i} />
                            : null
            )}
        </div>
    )
}

Streams.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        platform: PropTypes.oneOf(['twitch', 'mixer']),
        name: PropTypes.string,
        show: PropTypes.bool
      })
    ),
  }
  
  export default PreviewWrapper