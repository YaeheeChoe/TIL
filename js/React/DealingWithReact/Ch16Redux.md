# Chapter 16: Redux

Date: January 10, 2022

# 학습한 부분

Chapter 16: Redux

## 리덕스의 3가지 규칙

1. 1애플리케이션 1스토어
2. 읽기전용임(불변성 유지)
3. 리듀서는 순수함수여야한다

### action

상태에 변화가 필요하면 발생. 객체로 되어있다

### reducer

변화를 일으키는함수

```jsx
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle,
      }
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      }
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      }
    default:
      return state
  }
}
```

### dispatch

스토어의 내장함수로 액션을 발생시키는 동작을 함

```jsx
divToggle.onClick = () => {
  store.dispatch(toggleSwitch())
}
btnIncrease.onClick = () => {
  store.dispatch(increase(1))
}
btnDecrease.onClick = () => {
  store.dispatch(decrease())
}
```

### subscribe

subscribe에 리스너 함수를 파라미터로 넣어주면 이 리스너가 디스패치되어 상태 업데이트마다 호출해준다.

```jsx
const render = () => {
  const state = store.getState()

  if (state.toggle) {
    divToggle.classList.add('active')
  } else {
    divToggle.classList.remove('active')
  }
  counter.innerText = state.counter
}
render()
store.subscribe(render)
```

# 질문

# 피드백

😀