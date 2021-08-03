import styled from 'styled-components'

export const ReplayContainer = styled.div`
  position: absolute;
  bottom: 25%;
  cursor: ${props => props.isReveal ? 'pointer' : ''};
  transition: opacity 1000ms ease;
  opacity: ${props => props.isReveal ? '0.25' : '0'};
`

export const PlayAgain = styled.div`
  margin: 18px;
`
