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

    // if (!roomNameInput || !userNameInput) return

    const newUserName = userNameInput || 'Anônimo'
    
    const data = await updateRoom({ 
      roomName: roomNameInput,
      userName: newUserName,
      action: {
        description: 'joinOrCreateRoom'
      }
    })

    if (!data) return

    const { room, alteredUserName } = data

    const playersWithSameName = room.players.find(player => player.userName === newUserName)

    if (Array.isArray(playersWithSameName)) {
      return console.log(`Ja existe um usuario com esse nome nessa sala. Favor escolher um nome diferente`)
    }

    setUserName(alteredUserName || newUserName)
    setRoomName(room.name)
    setRoom(data)

    history.push(`/${data.room.name}`)
    return
  }
  
  return (
    <div className="FormContainer">
      <input ref={roomNameRef} className='input' onChange={(e) => {e.target.value = e.target.value.toLocaleLowerCase(); setRoomNameInput(e.target.value)}} placeholder={'nome da sala'}></input>
      <input ref={userNameRef} className='input' onChange={(e) => {e.target.value = e.target.value.toLocaleLowerCase(); setUserNameInput(e.target.value)}} placeholder={'seu nome'}></input>
      <Button text={'Entrar'} onClick={e => handleSubmit(e)}/>
    </div>
  )
}