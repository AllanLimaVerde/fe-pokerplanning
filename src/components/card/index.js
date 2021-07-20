import React from 'react'
import { CardContainer } from './style'

export const Card = (props) => {
  return (
    <CardContainer onClick={props.onClick} isSelected={props.isSelected}>
      {props.number}
    </CardContainer>
  )
}