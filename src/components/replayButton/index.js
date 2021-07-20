import React from 'react'
import { ReplayContainer, PlayAgain } from './style.js'
import ReplayIcon from '@material-ui/icons/Replay'

export const ReplayButton = (props) => {
  return (
    <ReplayContainer isReveal={props.isReveal} onClick={props.onClick}>
      <ReplayIcon style={{ color: 'white', transform: 'scale(2.7)' }} />
      <PlayAgain>Jogar de novo</PlayAgain>
    </ReplayContainer>
  )
}