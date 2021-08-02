import React, { useEffect } from 'react'
import { Card, PlayerAvatar, ReplayButton, Countdown } from '../../components'
import { App, AppHeader, CardsContainer, AvatarsContainer } from './style'
import { roomStatuses } from '../../constants'
import useRoom from './hooks'

const Room = () => {
  const {
    playerId,
    setPlayerId,
    room,
    selectedCard, 
    setSelectedCard,
    countdown, 
    setCountdown,
    isRevealTime, 
    setIsRevealTime,
    socket, 
    fibonacci,
    getPlayerId,
    connect,
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
    if (room && room.room && room.room.status === roomStatuses.reveal && !countdown && !isRevealTime) {
      countdownSetup()
    }

    if (isRevealTime && room && room.room && room.room.status === roomStatuses.waiting) {
    setIsRevealTime(false)
    setSelectedCard(null)
    }
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