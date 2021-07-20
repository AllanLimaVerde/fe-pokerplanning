import React from 'react'
import './style.css'

export const Button = (props) => {
  return (
    <button className="Button" onClick={props.onClick}>{props.text}</button>
  )
}