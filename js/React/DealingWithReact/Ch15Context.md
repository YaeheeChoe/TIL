# Chapter 15: Context API

Date: January 10, 2022

# 학습한 부분

Chapter 15: Context API

[export - JavaScript | MDN](https://developer.mozilla.org/ko/docs/web/javascript/reference/statements/export)

### export default의 뜻

export는 다른 프로그램에서 import (c의 include 개념)하기위해 내보내는 것으로

export named와 export default가 있ㄷㅏ

여기서 named가 아닌 default를 사용하면 import할 때, 지정한 이름 대신 쓰고싶은 이름을 쓸 수있음

# 예제 코드

[TIL/js/React/DealingWithReact/ch15context at main · YaeheeChoe/TIL](https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/ch15context)

![whale_AJxbeuOkXi.gif](Chapter%2015%20Context%20API%20ac838e2bd3514f8da799ec9f3b65c588/whale_AJxbeuOkXi.gif)

### Function as a child (Render Props) 패턴

Component안에 함수를 넣은 것을 말한다.

### Context 사용 예제

1. context 생성

```jsx
const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
})
```

1. Consumer로 값 받아오기

```jsx
const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {(value) => (
        <div
          style={{
            width: '64px',
            height: '64px',
            background: value.color,
          }}
        ></div>
      )}
    </ColorContext.Consumer>
  )
}
```

사용시 provider로 넘겨줄 value를 지정해주면 된다.

```jsx
<ColorContext.Provider value={{ color: 'red' }}>
     <div>
       <ColorBox />
     </div>
</ColorContext.Provider>
```

위와같이 넘겨주면 무한 리프레시 문제가 발생할 수 있습니다. 다음 글을 참고하세요.

[Context - React](https://reactjs.org/docs/context.html#caveats)

다음과같이 consumer와 provider를 따로 만들어준 후 사용해줘도 좋다

```jsx
import { createContext, useState } from 'react'
//새 콘텍스트 생성
const ColorContext = createContext({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
})
const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black')
  const [subcolor, setSubcolor] = useState('red')

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  }
  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
}
const { Consumer: ColorConsumer } = ColorContext
export { ColorProvider, ColorConsumer }
export default ColorContext
```

또, useContext를 사용해 Consumer와 provider를 지정하지 않고도 간편하게 context를 사용할 수있다.

```jsx
import React, { useContext, useState } from 'react'
import ColorContext from '../contexts/color'
const ColorBox = () => {
  const { state } = useContext(ColorContext)
  return (
    <>
      <div
        style={{
          width: '128px',
          height: '128px',
          background: state.color,
        }}
      ></div>
...
```

# 질문

xxx 한 부분은 어떻게 해결해야하나요?

# 피드백

`Context.Consumer`는 거의 사용하지 않습니다. 보통 `useContext`를 사용하죠. `Context.Consumer`는 클래스 컴포넌트 시절 많이 사용되었습니다.