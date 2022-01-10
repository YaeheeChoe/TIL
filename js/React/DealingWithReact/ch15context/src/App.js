import logo from './logo.svg'
import './App.css'
import ColorBox from './components/ColorBox'
import { ColorProvider } from './contexts/color'
import SelectColor from './components/SelectColor'
function App() {
  return (
    <>
      <ColorProvider>
        <div>
          <ColorBox />
          <SelectColor />
        </div>
      </ColorProvider>
    </>
  )
}

export default App
