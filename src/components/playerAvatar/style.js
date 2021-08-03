import styled from 'styled-components'

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100px;
  height: 72px;
  border-radius: 15px;
  font-size: large;
  margin: 6px;
`

export const PlayerNametag = styled.div`
  color: white;
`

export const CurrentPlayerVote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
  width: 50px;
  color: ${props => props.isReveal ? 'black' : 'aliceblue'};
  height: 72px;
  border-radius: 15%;
  margin: 6px;
  font-size: 48px;
  transition: color 150ms ease-in;
  user-select: none;
`
