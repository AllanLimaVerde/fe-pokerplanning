import React, { useState, useRef } from 'react'
import { Button } from '../'
import { updateRoom } from '../../services/api'
import { history } from '../../navigation/history'
import { useContext } from 'react'
import { Context } from '../../context'
import { actions } from '../../constants'
import { Text } from '../'
import './style.css'

export const Form = () => {
  const { setUserName, setRoomName, setRoom } = useContext(Context)

  const roomNameRef = useRef()
  const userNameRef = useRef()

  const [roomNameInput, setRoomNameInput] = useState('')
  const [userNameInput, setUserNameInput] = useState('')
  const [usernameConflict, setUsernameConflict] = useState(null)


  const handleSubmit = async e => {
    e.preventDefault()
    setUsernameConflict(false)

    const newUserName = userNameInput || 'Anônimo'
    
    const data = await updateRoom({ 
      roomName: roomNameInput,
      userName: newUserName,
      action: {
        description: 'joinOrCreateRoom'
      }
    })

    if (!data) return

    const { room, SSEaction } = data

    if (SSEaction === actions.sse.playerNameConflict) {
      return setUsernameConflict(`Username '${newUserName}' já está em uso`)
    }

    setUserName(newUserName)
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
      {usernameConflict && <Text text={usernameConflict}/>}
    </>
  )
}