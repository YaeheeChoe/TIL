import styled from 'styled-components'
import palette from '../../lib/styles/palette'

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursur: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
`

function Button(props) {
  return <StyledButton {...props} /*받아오는 props를 모두 전달*/ />
}

export default Button
