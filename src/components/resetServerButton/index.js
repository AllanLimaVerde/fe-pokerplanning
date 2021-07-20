import React from 'react'
import './style.css'

export const ResetServerButton = (props) => {
  return (
    <div className="ResetServerButton" onClick={props.onClick}>{props.text}</div>
  )
}