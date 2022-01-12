import styled from 'styled-components'

const RedDiv = styled.div`
  background: ${(props) => props.color};
  font-size: 1.5rem;
  color: white;
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ColoredBox = ({ color }) => {
  return <RedDiv color={color}>{color}</RedDiv>
}
export default ColoredBox
