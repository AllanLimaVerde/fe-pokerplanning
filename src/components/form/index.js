import React, { useState, useRef } from 'react'
import { Button } from '../'
import { updateRoom } from '../../services/api'
import { history } from '../../navigation/history'
import { useContext } from 'react'
import { Context } from '../../context'
import './style.css'

export const Form = () => {
  const { setUserName, setRoomName, setRoom } = useContext(Context)

  const roomNameRef = useRef()
  const userNameRef = useRef()

  let [roomNameInput, setRoomNameInput] = useState('')
  let [userNameInput, setUserNameInput] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    
    const data = await updateRoom({ 
      roomName: roomNameInput,
      userName: userNameInput || 'Anônimo',
      action: {
        description: 'joinOrCreateRoom'
      }
    })

    if (!data) return

    setUserName(userNameInput)
    setRoomName(data.room.name)
    setRoom(data)

    history.push(`/${data.room.name}`)
    return
  }
  
  return (
    <div className="FormContainer">
      <input ref={roomNameRef} className='input' onChange={(e) => setRoomNameInput(e.target.value)} placeholder={'nome da sala'}></input>
      <input ref={userNameRef} className='input' onChange={(e) => setUserNameInput(e.target.value)} placeholder={'seu nome'}></input>
      <Button text={'Entrar'} onClick={e => handleSubmit(e)}/>
    </div>
  )
}