import React, { useEffect, useRef, useState, useContext } from 'react'
import { Context } from '../../context'
import { getFibonacciNumbers } from '../../services'
import { roomStatuses, ROOT_URL, environment } from '../../constants'

const useRoom = () => {
  const { userName, playerId, setPlayerId, roomName, room, setRoom } = useContext(Context)
  const [selectedCard, setSelectedCard] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const [isRevealTime, setIsRevealTime] = useState(false)
  const [connected, setConnected] = useState(false)
  const [socket, setSocket] = useState(null)

  let countdownInterval = useRef(null)

  let connecting = false

  const handleSocketChange = () => {
    if (!socket) return connect()

    socket.addEventListener('open', function(event) {
      console.log('socket', 'open')
      setConnected(true)
      const enterData = { type: 'playerEnteringRoom', data: { userName, playerId, roomName } }
      send(enterData)
    })
  
    socket.addEventListener('close', function(event) {
      console.log('socket', 'close')
      setConnected(false)
    })
  
    socket.addEventListener('message', event => {
      const { data: message } = event
      const data = JSON.parse(message)
  
      console.log('socket', 'message', data)
  
      const { type, data: _data } = data
  
      switch (type) {
        case 'enter': {
          console.log('Received enter message')
          break
        }
        case 'vote': {
          console.log('Received vote message')
          break
        }
        case 'playAgain': {
          console.log('Received playAgain message')
          break
        }
        case 'newPlayerInRoom': {
          console.log('Received newPlayerInRoom message')
          setRoom(_data.room)
          console.log('updated room line 91')
          console.log(room)
          break
        }
        case 'setPlayerId': {
          console.log('Received setPlayerId message')
          const { playerId } = _data
          setPlayerId(playerId)
          localStorage.setItem('playerId', playerId)
          break
        }
        case 'updateRoom': {
          console.log('Received updateRoom message')
          console.log(_data)
          setRoom({ room: _data })
          console.log('updated room line 104')
          console.log(room)
          break
        }
        case 'revealTime': {
          console.log('Received revealTime message')
          // setIsRevealTime(true)
          countdownSetup()
          break
        }
        default: {
          setRoom(_data.room)
          console.log('updated room line 110')
          console.log(_data.room)
          break
        }
      }
    })
  
    socket.addEventListener('error', event => {
      console.log('socket', 'error', event)
    })
  }

  const send = (data) => {
    // if (!connected) {
    //   throw new Error('WebSocket is not connected')
    // }
    const value = JSON.stringify(data)
    socket.send(value)
  }

  const getPlayerId = () => {
    return localStorage.getItem('playerId') || null
  }

  const connect = () => {
    connecting = true
  
    const url = {
      local: `ws://localhost:5000`,
      production: `wss://pokerplanning-da-galera.herokuapp.com`
    }
    
    setSocket(new WebSocket(url[environment]))
  }
  
  function disconnect() {
    socket.close()
    setSocket(null)
  }

  const handleCardClick = async ({ e, number }) => {
    e.preventDefault()
    if (countdown || isRevealTime) return
    const selectedNumber = number === selectedCard ? null : number
    setSelectedCard(selectedNumber)

    console.log('Room b4 logic:')
    console.log(room)

    setRoom(room => {
      console.log(room)
      room.room.players[playerId].currentVote = selectedNumber
      return room
    })
    console.log('updated room line 122')
    console.log(room)

    const sendData = { type: 'vote', data: { playerId, selectedNumber, roomName } }
    send(sendData)
  }

  const fibonacci = getFibonacciNumbers(6)
  // @ts-ignore
  fibonacci.push('?')

  const countdownSetup = () => {
    setCountdown(3)

    if (!countdownInterval.current) {
      countdownInterval.current = setInterval(() => {
        setCountdown(c => c - 1)
      }, 1000)
    } else {
      clearInterval(countdownInterval.current)
      countdownInterval.current = null
    }
  }

  const handleReplayClick = async e => {
    e.preventDefault()

    if (!isRevealTime) return

    // const action = { description: 'resetRoomForNewVote' }
    // const updatedRoom = await updateRoom({ roomName, userName, action })
    // setRoom(updatedRoom)
    // console.log('updated room line 181')
    // console.log(room)
    send({ type: 'playAgain', data: { roomName } })
    setSelectedCard(null)
    setIsRevealTime(false)
  }

  return({
    userName,
    playerId,
    setPlayerId,
    roomName,
    room,
    setRoom,
    selectedCard, 
    setSelectedCard,
    countdown, 
    setCountdown,
    isRevealTime, 
    setIsRevealTime,
    connected, 
    setConnected,
    socket, 
    setSocket,
    fibonacci,
    getPlayerId,
    connect,
    send,
    countdownSetup,
    countdownInterval,
    handleReplayClick,
    handleCardClick,
    handleSocketChange
  })
}


export default useRoom