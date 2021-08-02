import './lobby.css'
import React, { useState, useEffect } from 'react'
import { Form, Headline, ResetServerButton } from '../../components'
import { updateRoom } from '../../services/api'

function Lobby() {
  const [resetText, setResetText] = useState(`resetar servidor`)

  const handleServerResetClick = async e => {
    e.preventDefault()
    const action = { description: 'resetServer' }

    try {
      const data = await updateRoom({ action })
      return setResetText(data.message)
    } catch (err) {
      console.log(err)
    }

    setResetText(`Houve algum problema :(`)
  }

  useEffect(() => {
    const playerId = localStorage.getItem('playerId')
    const action = { description: 'playerOnLobby', payload: { playerId } }
    console.log(action)
    updateRoom({ action })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Headline text={'PokerPlanning da Galera'} />
        <Form />
        <ResetServerButton onClick={handleServerResetClick} text={resetText} />
      </header>
    </div>
  );
}

export default Lobby