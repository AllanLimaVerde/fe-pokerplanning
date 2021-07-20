import React from 'react'
import './style.css'

export const Text = (props) => {
  return (
    <p className="Text">
      {props.text}
    </p>
  )
}