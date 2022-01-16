# Chapter 17: react-redux

Date: January 11, 2022

# 학습한 부분

Chapter 17: react-redux

![Capture.PNG](Chapter%2017%20react-redux%204d664a43154e444684f7016b2936ba8f/Capture.png)

리덕스 사용시 프레젠테이셔널 컴포넌트(상태관리ㄴ)와 컨테이너 컨포넌트(상태관리ㅇ)를 분리하는 패턴을 많이 사용한다

# 예제 코드

[TIL/js/React/DealingWithReact/ch17react-redux at main · YaeheeChoe/TIL](https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/ch17react-redux)

![whale_l9XUl2loXV.gif](Chapter%2017%20react-redux%204d664a43154e444684f7016b2936ba8f/whale_l9XUl2loXV.gif)

### redux-actions

redux-actions를 사용하면, 액션 생성함수를 짧고 간결하게 제작할 수 있고

리듀서 작성도 switch/case문 없이 각각의 액션마다 업데이트 함수를 설정하는 방식으로 할 수 있다.

```jsx
import { createAction, handleActions } from 'redux-actions'
//액션타입 정의
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
//액션생성함수
export const increase = createAction(INCREASE)
export const decrease = createAction(DECREASE)

const initialState = {
  number: 0,
}

//리듀서
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
)

export default counter
```

### Hook사용한 컨테이너 컴포넌트

hook을 사용하면 connect 함수를 사용하지않고 리덕스 스토어와 연동이 가능하다

```jsx
import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Counter from '../components/Counter'
import { increase, decrease } from '../modules/counter'

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number)//상태조회
  const dispatch = useDispatch()// store 내장함수 dispatch를 불러온다
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch])
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch])

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  )
}

export default CounterContainer
```

# 질문

# 피드백

다음 18챕터에서 피드백 한번에 해드렸어용 [Chapter 18: Redux Middleware](https://www.notion.so/Chapter-18-Redux-Middleware-470e2caf473a42b49780d9f277533918)