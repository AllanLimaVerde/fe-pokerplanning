import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.isSelected ? 'blue' : 'aliceblue'};
  color: ${props => props.isSelected ? 'white' : 'black'};
  width: 100px;
  height: 133px;
  border-radius: 15%;
  margin: 6px;
  font-size: 48px;
  cursor: pointer;
  transition: transform 100ms ease-in;
}`