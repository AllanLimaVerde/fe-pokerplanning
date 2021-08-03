import './lobby.css'
import React, { useState, useEffect } from 'react'
import { Form, Headline, ResetServerButton } from '../../components'
import { updateRoom } from '../../services/api'

function Lobby() {
  const [resetText, setResetText] = useState(`resetar servidor`)

  const handleServerResetClick = async e => {
    e.preventDefault()
    const action = { description: 'resetServer' }
    const errorText = `Houve algum problema :(`

    try {
      const data = await updateRoom({ action })
      return setResetText(data.message)
    } catch (err) {
      console.log(errorText, err)
    }

    setResetText(errorText)
  }

  useEffect(() => {
    const playerId = localStorage.getItem('playerId')
    const action = { description: 'playerOnLobby', payload: { playerId } }
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