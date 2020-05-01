import { faMixer, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { MixerPlayer } from 'react-mixer-embeds'
import TwitchPlayer from 'react-twitch-embed-video'

const Link = ({ platform, id, children }) => {
    const url = 
        platform === 'twitch' ? `https://twitch.tv/${id}` :
        platform === 'mixer' ? `https://mixer.com/${id}` : ''
    return <a className="title" href={url}>{children}</a>
}

const Icon = ({ platform }) => {
    return platform === 'twitch' ? <FontAwesomeIcon style={{ color: '#6441A4', height: '1em', width: '1em' }} icon={faTwitch} /> :
        platform === 'mixer' ? <FontAwesomeIcon style={{height: '1em', width: '1em' }} icon={faMixer} /> : null
}

const Player = ({ platform, id }) => {
    const EmbedPlayer = 
        platform === 'twitch' ? ({ ...args }) => <TwitchPlayer layout="video" targetId={`tw-${args.channel.toLowerCase()}`} {...args}/> :
        platform === 'mixer' ? ({ ...args }) => <MixerPlayer {...args}/> : null
    return <EmbedPlayer muted height={180} width={320} channel={id} />
}

const Stream = ({ item }) => (
    <article className="tile is-child box">
        <Link {...item}>
            <Icon platform={item.platform} />
            <span>{item.id}</span>
        </Link>
        <Player className="subtitle" {...item}/>
    </article>
)

const SimpleStream = ({ item }) => (
    <article className="tile is-child box">
        <Link {...item}>
            <Icon platform={item.platform} />
            <span>{item.id}</span>
        </Link>
        <div style={{ backgroundColor: 'red' }} />
    </article>
)

const Loading = () => (
    <article className="tile is-child box">
        <div>
            <FontAwesomeIcon style={{height: '3em', width: '3em' }} icon={faSpinner} spin/>
        </div>
    </article>
)

async function fetchMixer(channels) {
    if (!channels.length) { return [] }
    const res = await fetch(`https://mixer.com/api/v1/channels?fields=token,online,bannerUrl,viewersCurrent,type&where=token:in:${channels.join(';')}`, {
        headers: { 'Client-ID': process.env.GATSBY_MIXER_CLIENT_ID }
    }) 
    const data = await res.json();
    console.log('Mixer', data)

    return data.map(d => ({
        id: d.token,
        platform: 'mixer',
        online: d.online,
        bannerUrl: d.bannerUrl,
        viewersCount: d.viewersCurrent,
        game: d.type.id === process.env.GATSBY_MIXER_SIEGE_ID
    }))
}

async function fetchTwitch(channels) {
    if (!channels.length) { return [] }
    const res = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channels.join('&user_login=')}`, {
        headers: { 'Client-ID': process.env.GATSBY_TWITCH_CLIENT_ID }
    }) 
    const { data } = await res.json();
    console.log('Twitch', data);
    
    return data.map(d => ({
        id: d.user_name,
        platform: 'twitch',
        online: d.type === 'live',
        bannerUrl: d.thumbnail_url.replace('{width}', 320).replace('{height}', 180),
        viewersCount: d.viewer_count,
        game: d.game_id === process.env.GATSBY_TWITCH_SIEGE_ID
    }))
}

const PreviewWrapper = ({ items, preview }) => {
    if (preview) {
        return (
            <div className="tile is-ancestor streams">
                {items.map(i => <SimpleStream key={i.id} item={i} />)}
            </div>
        )
    } else {
        return <Streams items={items} />
    }
}

const Streams = ({ items }) => {

    const [streams, setStreams] = useState(() => items.map(i => ({...i, fetched: false})));

    const callback = res => setStreams((prev) =>
        prev.map(item => ({ ...item, ...res.find(r => r.id === item.id && r.platform === item.platform) }))
    );
    const finallyCb = platform => setStreams(streams.map(item => ({ ...item, fetched: item.platform === platform || item.fetched })))

    useEffect(() => {
        fetchMixer(streams.filter(s => s.platform === 'mixer').map(s => s.id)).then(callback).finally(finallyCb('mixer'))
        fetchTwitch(streams.filter(s => s.platform === 'twitch').map(s => s.id)).then(callback).finally(finallyCb('twitch'))
    }, []) // Refactor to hide offline Mixer

    console.log(streams);

    return (
        <div className="tile is-ancestor streams"> {/* Rework to columns */}
            {streams.map(i => 
                !i.fetched
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
        id: PropTypes.string,
        platform: PropTypes.oneOf(['twitch', 'mixer']),
      })
    ),
  }
  
  export default PreviewWrapper