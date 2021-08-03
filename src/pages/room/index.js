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
    handleSocketChange,
    isThereAnotherPlayerInRoom,
    setIsThereAnotherPlayerInRoom
  } = useRoom()
  
  useEffect(() => {
    setPlayerId(getPlayerId())
    connect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleSocketChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    const playerId = getPlayerId()
    if (room && room.room) {
      if (Object.keys(room.room.players).find(playerKey => playerKey != playerId)) {
        return setIsThereAnotherPlayerInRoom(true)
      }
      setIsThereAnotherPlayerInRoom(false)
    }

    if (room && room.room && room.room.status === roomStatuses.reveal && !countdown && !isRevealTime) {
      countdownSetup()
    }

    if (isRevealTime && room && room.room && room.room.status === roomStatuses.waiting) {
      setIsRevealTime(false)
      setSelectedCard(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room])

  useEffect(() => {
    if (countdown !== null && countdown < 1) {
      setCountdown(null)
      clearInterval(countdownInterval.current)
      countdownInterval.current = null
      setIsRevealTime(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown])

  return (
    <App>
      <AppHeader>
        {(!room || !room.room || !isThereAnotherPlayerInRoom) && <div>Sala vazia :|</div>}
        {countdown > 0 && <Countdown value={countdown} />}
        <ReplayButton isReveal={isRevealTime} onClick={handleReplayClick} />
        <AvatarsContainer>
        {room && room.room && room.room.players &&
          Object.keys(room.room.players)
          .filter(_playerId => _playerId !== playerId)
          .map(_playerId => {
            const player = room.room.players[_playerId];
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