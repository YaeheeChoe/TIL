import logo from './logo.svg'
import './App.css'
import React from 'react'
import { useState } from 'react'
import loadable from '@loadable/component'
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>,
})

function App() {
  const [visible, setVisible] = useState(false)
  const onClick = () => {
    setVisible(!visible)
  }
  const onMouseOver = () => {
    SplitMe.preload()
  }
  return (
    <>
      <p onClick={onClick} onMouseOver={onMouseOver}>
        Hello js!
      </p>
      {visible && <SplitMe />}
    </>
  )
}

export default App
