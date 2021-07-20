import React, { useState } from 'react'
import { Route, Switch, Router } from 'react-router-dom'
import { history } from './history'
import { Lobby, Room } from '../pages'
import { Context } from '../context'

export const Navigation = () => {
  const [userName, setUserName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [room, setRoom] = useState(null)

  return (
    <Router history={history}>
      <Context.Provider value={{ userName, setUserName, roomName, setRoomName, room, setRoom }}>
        <Switch>
          <Route exact path='/'>
            <Lobby />
          </Route>
          <Route exact path='/:roomName'>
            <Room />
          </Route>
        </Switch>
      </Context.Provider>
    </Router>
  )
}
