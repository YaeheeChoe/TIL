import { ColorConsumer } from '../contexts/color'

const colors = [
  '#DAF7A6',
  '#ECF0F1',
  '#FFC300',
  '#FF5733',
  '#C70039',
  '#900C3F',
]

function SelectColor() {
  return (
    <div>
      <h2>색상을 선택하세요</h2>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: 'flex' }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => actions.setColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  actions.setSubcolor(color)
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>

      <hr></hr>
    </div>
  )
}

export default SelectColor
