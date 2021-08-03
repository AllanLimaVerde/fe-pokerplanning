import { useRef, useState, useContext } from 'react'
import { Context } from '../../context'
import { getFibonacciNumbers } from '../../services'
import { WS_URL } from '../../constants'

const useRoom = () => {
  const { userName, playerId, setPlayerId, roomName, room, setRoom } = useContext(Context)
  const [isThereAnotherPlayerInRoom, setIsThereAnotherPlayerInRoom] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const [isRevealTime, setIsRevealTime] = useState(false)
  const [connected, setConnected] = useState(false)
  const [socket, setSocket] = useState(null)

  let countdownInterval = useRef(null)

  const handleSocketChange = () => {
    if (!socket) return connect()

    socket.addEventListener('open', function(event) {
      setConnected(true)
      send({ type: 'playerEnteringRoom', data: { userName, playerId, roomName } })
    })
  
    socket.addEventListener('close', function(event) {
      setConnected(false)
    })
  
    socket.addEventListener('message', event => {
      const { data: message } = event
      const data = JSON.parse(message)
  
      const { type, data: _data } = data
  
      switch (type) {
        case 'newPlayerInRoom': {
          setRoom(_data.room)
          break
        }
        case 'setPlayerId': {
          const { playerId } = _data
          setPlayerId(playerId)
          localStorage.setItem('playerId', playerId)
          break
        }
        case 'updateRoom': {
          setRoom({ room: _data })
          break
        }
        case 'revealTime': {
          countdownSetup()
          break
        }
        default: {
          setRoom(_data.room)
          break
        }
      }
    })
  
    socket.addEventListener('error', event => {
      console.log('socket', 'error', event)
    })
  }

  const send = (data) => {
    const value = JSON.stringify(data)
    socket.send(value)
  }

  const getPlayerId = () => {
    return localStorage.getItem('playerId') || null
  }

  const connect = () => {    
    setSocket(new WebSocket(WS_URL))
  }

  const handleCardClick = async ({ e, number }) => {
    e.preventDefault()
    if (countdown || isRevealTime) return
    const selectedNumber = number === selectedCard ? null : number
    setSelectedCard(selectedNumber)

    setRoom(room => {
      room.room.players[playerId].currentVote = selectedNumber
      return room
    })

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
    handleSocketChange,
    isThereAnotherPlayerInRoom,
    setIsThereAnotherPlayerInRoom
  })
}


export default useRoom