import { Route, Routes } from 'react-router-dom'
import ColoredPage from './components/ColoredPage'
import Menu from './components/Menu'

function App() {
  return (
    <>
      <Menu />
      <hr />
      <Routes>
        <Route path='/red' element={<ColoredPage color='Red'></ColoredPage>} />
        <Route
          path='/blue'
          element={<ColoredPage color='blue'></ColoredPage>}
        />
      </Routes>
    </>
  )
}

export default App
