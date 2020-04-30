import { faMixer, faTwitch } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'
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

const Stub = () => (
    <article className="tile is-child box">
        <div>
            <FontAwesomeIcon style={{height: '3em', width: '3em' }} icon={faSpinner} spin/>
        </div>
    </article>
)

const Streams = ({ items }) => {
    return (
        <div className="tile is-ancestor streams">
            {/* <Stub /> */}
            {/* {items.map(i => <Stream key={i.id} item={i}/>)} */}
            {items.map(i => <Stub />)}
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
  
  export default Streams