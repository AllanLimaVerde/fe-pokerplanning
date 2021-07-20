import React from 'react'
import { AvatarContainer, PlayerNametag, CurrentPlayerVote } from './style.js'
import PersonIcon from '@material-ui/icons/Person'

export const PlayerAvatar = (props) => {
  return (
    <AvatarContainer>
      <PersonIcon style={{color: 'white', transform: 'scale(4) translateY(-33%)'}} />
      <PlayerNametag>{props.userName}</PlayerNametag>
      {props.currentVote && <CurrentPlayerVote isReveal={props.isReveal}>{props.currentVote}</CurrentPlayerVote>}
    </AvatarContainer>
  )
}