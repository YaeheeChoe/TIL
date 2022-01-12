import logo from './logo.svg'
import './App.css'
import { Suspense } from 'react/cjs/react.production.min'
import React from 'react'
import { useState } from 'react'
const SplitMe = React.lazy(() => import('./SplitMe'))

function App() {
  const [visible, setVisible] = useState(false)
  const onClick = () => {
    setVisible(!visible)
  }
  return (
    <>
      <p onClick={onClick}>Hello js!</p>
      <Suspense fallback={<div>loading...</div>}>
        {' '}
        {visible && <SplitMe />}{' '}
      </Suspense>
    </>
  )
}

export default App
