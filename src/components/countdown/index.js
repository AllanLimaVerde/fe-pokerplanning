import React from 'react'
import './style.css'

export const Countdown = (props) => {
  return (
    <div className="Countdown" >{props.value}</div>
  )
}