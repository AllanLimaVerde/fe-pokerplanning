import React from 'react'
import './style.css'

export const Headline = (props) => {
  return (
    <p className="Headline">
      {props.text}
    </p>
  )
}