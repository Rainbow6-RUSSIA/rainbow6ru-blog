import React from 'react'
import { MixerPlayer } from 'react-mixer-embeds'
import TwitchPlayer from 'react-twitch-embed-video'

const Player = ({ platform, name }) => {
    const EmbedPlayer = 
        platform === 'twitch' ? ({ ...args }) => <TwitchPlayer layout="video" targetId={`tw-${args.channel.toLowerCase()}`} {...args}/> :
        platform === 'mixer' ? ({ ...args }) => <MixerPlayer style={{ border: 'none' }} {...args}/> : null
    return <EmbedPlayer muted height={180} width={320} channel={name} />
}

export default Player