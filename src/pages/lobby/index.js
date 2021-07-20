import './lobby.css'
import React, { useState } from 'react'
import { Form, Headline, ResetServerButton } from '../../components'
import { updateRoom } from '../../services/api'

function Lobby() {
  const [resetText, setResetText] = useState(`resetar servidor`)

  const handleServerResetClick = async e => {
    e.preventDefault()
    const action = { description: 'resetServer' }

    try {
      const data = await updateRoom({ action })

      if (data.status === 200) {
        return setResetText(data.message)
      }
    } catch (_) { }

    setResetText(`Houve algum problema :(`)
  }

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