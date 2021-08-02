import React, { useState, useRef } from 'react'
import { Button } from '../'
import { updateRoom } from '../../services/api'
import { history } from '../../navigation/history'
import { useContext } from 'react'
import { Context } from '../../context'
import { v4 as uuid } from 'uuid'
import './style.css'

export const Form = () => {
  const { setUserName, setPlayerId, setRoomName, setRoom } = useContext(Context)

  const roomNameRef = useRef()
  const userNameRef = useRef()

  const [roomNameInput, setRoomNameInput] = useState('')
  const [userNameInput, setUserNameInput] = useState('')


  const handleSubmit = async e => {
    e.preventDefault()
    
    const newUserName = userNameInput || 'Anônimo'
    const newPlayerId = uuid()
    
    const data = await updateRoom({ 
      roomName: roomNameInput,
      userName: newUserName,
      playerId: newPlayerId,
      action: {
        description: 'joinOrCreateRoom'
      }
    })

    if (!data) return

    const { room } = data

    setUserName(newUserName)
    setPlayerId(newPlayerId)
    setRoomName(room.name)
    setRoom(data)

    history.push(`/${data.room.name}`)
    return
  }
  
  return (
    <>
      <div className="FormContainer">
        <input ref={roomNameRef} className='input' onChange={(e) => {e.target.value = e.target.value.toLocaleLowerCase(); setRoomNameInput(e.target.value)}} placeholder={'nome da sala'}></input>
        <input ref={userNameRef} className='input' onChange={(e) => {e.target.value = e.target.value.toLocaleLowerCase(); setUserNameInput(e.target.value)}} placeholder={'seu nome'}></input>
        <Button text={'Entrar'} onClick={e => handleSubmit(e)}/>
      </div>
    </>
  )
}