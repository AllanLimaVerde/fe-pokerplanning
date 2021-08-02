import React, { useEffect, useRef } from 'react'
import { Card, PlayerAvatar, ReplayButton, Countdown } from '../../components'
import { updateRoom } from '../../services/api'
import { useContext, useState } from 'react'
import { Context } from '../../context'
import { getFibonacciNumbers } from '../../services'
import { App, AppHeader, CardsContainer, AvatarsContainer } from './style'
import { roomStatuses, ROOT_URL, environment } from '../../constants'
import useRoom from './hooks'

const Room = () => {
  const {
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
  } = useRoom()
  
  useEffect(() => {
    setPlayerId(getPlayerId())
    connect()
  }, [])

  useEffect(() => {
    handleSocketChange()
  }, [socket])

  useEffect(() => {
    console.log('ROOM HAS BEEN UPDATED', room)
    if (room && room.room && room.room.status === roomStatuses.reveal && !countdown && !isRevealTime) {
      countdownSetup()
    }

    if (isRevealTime && room && room.room && room.room.status === roomStatuses.waiting) {
    setIsRevealTime(false)
    setSelectedCard(null)
    }

    // if (!room) {
    //   // const sendData = { type: 'getRoom', data: { playerId, roomName } }
    //   // send(sendData)
    //   connect()
    // }
  }, [room])

  useEffect(() => {
    if (countdown < 1) {
      clearInterval(countdownInterval.current)
      countdownInterval.current = null
      setCountdown(null)
      setIsRevealTime(true)
    }
  }, [countdown])

  return (
    <App>
      <AppHeader>
        {(!room || !room.room || Object.keys(room.players || room.room.players).length <= 1) && <div>Sala vazia :|</div>}
        {countdown && countdown > 0 && <Countdown value={countdown} />}
        {isRevealTime && <ReplayButton isReveal={isRevealTime} onClick={handleReplayClick} />}
        <AvatarsContainer>
        {room && room.room && room.room.players && 
          Object.keys(room.room.players)
          .filter(_playerId => _playerId !== playerId)
          .map(playerKey => {
            const player = room.room.players[playerKey];
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