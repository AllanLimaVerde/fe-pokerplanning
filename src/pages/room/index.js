import React, { useEffect, useRef } from 'react'
import { Card, PlayerAvatar, ReplayButton, Countdown } from '../../components'
import { updateRoom } from '../../services/api'
import { useContext, useState } from 'react'
import { Context } from '../../context'
import { getFibonacciNumbers } from '../../services'
import { App, AppHeader, CardsContainer, AvatarsContainer } from './style'
import { roomStatuses } from '../../constants'

function Room() {
  const { userName, roomName, room, setRoom } = useContext(Context)
  const [selectedCard, setSelectedCard] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const [isRevealTime, setIsRevealTime] = useState(false)
  let countdownInterval = useRef(null)
  let pollingInterval = useRef(null)

  const exitingEventListenerFunction = e => {
    e.preventDefault()
    window.removeEventListener("beforeunload", exitingEventListenerFunction)
    const action = { description: 'leaveRoom' }
    updateRoom({ roomName, userName, action })
  }

  useEffect(() => {
    window.addEventListener("beforeunload", exitingEventListenerFunction)
  }, [])

  const handleCardClick = async ({ e, number }) => {
    e.preventDefault()
    const selectedNumber = number === selectedCard ? null : number
    clearInterval(pollingInterval.current)
    setSelectedCard(selectedNumber)

    const action = { description: 'selectCard', payload: selectedNumber }
    const updatedRoom = await updateRoom({ roomName, userName, action })
    setRoom(updatedRoom)
  }

  const fibonacci = getFibonacciNumbers(6)
  fibonacci.push('?')

  console.log(fibonacci)

  const createInterval = () => {
    pollingInterval.current = setInterval(async () => {
      const action = { description: 'checkRoomForChange', payload: room }
      const updatedRoom = await updateRoom({ roomName, userName, action })
      const previousRoomStatus = room && room.room.status

      if (!(updatedRoom.room.status === roomStatuses.waiting && previousRoomStatus === roomStatuses.reveal)) {
        setRoom(updatedRoom)
      }

      if (updatedRoom.room.status === roomStatuses.reveal && previousRoomStatus === roomStatuses.waiting) {
        clearInterval(pollingInterval.current)
      }

      if (updatedRoom.room.status === roomStatuses.waiting && previousRoomStatus != roomStatuses.waiting) {

      }
    }, room && room.room && room.room.pollingInterval || 3000)
  }

  if (!pollingInterval.current && !countdown) {
    createInterval()
  } else {
    clearInterval(pollingInterval.current)
    pollingInterval.current = null
  }

  useEffect(() => {
    if (room && room.room.status === roomStatuses.reveal && !countdown && !isRevealTime) {
      countdownSetup()
    }

    if (isRevealTime && room && room.room.status === roomStatuses.waiting) {
    setIsRevealTime(false)
    setSelectedCard(null)
    }
  }, [room])

  useEffect(() => {
    if (countdown < 1) {
      clearInterval(countdownInterval.current)
      countdownInterval.current = null
      setCountdown(null)
      room && room.room.status === roomStatuses.reveal && setIsRevealTime(true)
      createInterval()
    }
  }, [countdown])

  const countdownSetup = () => {
    if (!room || (room.room.status != roomStatuses.reveal)) return

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

    const action = { description: 'resetRoomForNewVote' }
    const updatedRoom = await updateRoom({ roomName, userName, action })
    setRoom(updatedRoom)
    setSelectedCard(null)
    setIsRevealTime(false)
    createInterval()
  }

  return (
    <App>
      <AppHeader>
        {(!room || room.room.players.length === 1) && <div>Sala vazia :|</div>}
        {countdown && countdown > 0 && <Countdown value={countdown} />}
        <ReplayButton isReveal={isRevealTime} onClick={handleReplayClick} />
        <AvatarsContainer>
          {room && room.room && room.room.players && room.room.players.length && room.room.players.map(player => {
            if (player.userName === userName) {
              return null
            }
            
            return (
              <PlayerAvatar key={player.userName} userName={player.userName} currentVote={player.currentVote} isReveal={isRevealTime} />
            )
          })}
        </AvatarsContainer>
        <CardsContainer>
          {fibonacci.map(number => {
            return (
              <Card key={number} number={number} onClick={e => handleCardClick({ e, number })} isSelected={number === selectedCard} />
            )
          })}
        </CardsContainer>
      </AppHeader>
    </App>
  )
}

export default Room