# Chapter 08: Hooks

Date: December 31, 2021

# 학습한 부분

Chapter 08: Hooks

# 예제 코드

### useEffect

컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hooks

```jsx
useEffect(() => {
		console.log('렌더링이 완료되었습니다.')
		console.log({name,nickname})
	})
```

![lsXjQIHeWx.gif](Chapter%2008%20Hooks%2096c7e1a685cf401abc6ce0cbc0121d1f/lsXjQIHeWx.gif)

만약 처음 렌더링 할때만 작업을 실행하고 싶다면, useEffect의 두번째 인자를 []로 주면 된다.

```jsx
useEffect(() => {
		console.log('렌더링이 완료되었습니다.')
		console.log({name,nickname})
	},[])
```

다음과같이 특정 값에 변동이 있을 때 작업을 수행하고싶다면, 두번째 인자에 [값]을 주면된다.

![1laSyQOzBh.gif](Chapter%2008%20Hooks%2096c7e1a685cf401abc6ce0cbc0121d1f/1laSyQOzBh.gif)

```jsx
useEffect(() => {
		console.log('렌더링이 완료되었습니다.')
		console.log({name})
	},[name])
```

다음과같이 clean up함수를 반환해주면 컴포넌트가 언마운트 되기 전 혹은 업데이트 되기 전에 수행할 작업을 지정할 수 있다.

```jsx
useEffect(() => {
		console.log('effect')
		console.log({name})
		return () =>{
			console.log('cleanup')
			console.log({name})
		}
	},[name])
```

다음과같이 컴포넌트가 나타날 때 effect, 사라질 때 clean up이 수행된다

![KAqzoY3mm6.gif](Chapter%2008%20Hooks%2096c7e1a685cf401abc6ce0cbc0121d1f/KAqzoY3mm6.gif)

### useReducer

리듀서는 상태, 그리고 업데이트에 필요한 정보(action)를 입력받아 새로운 상태를 반환하는 함수입니다.

다음과 같이 컴포넌트 업데이트 로직을 밖으로 빼낼 수 있다는게 큰 장점이죠.

```jsx
import React, {useReducer} from 'react'

function reducer(state,action){
	switch(action.type){
		case 'INCREMENT':
			return {value : state.value+1}
		case 'DECREMENT':
			return {value : state.value-1}
		default:
			return state
	}
}
function ReduceCounter() {
	const [state,dispatch] = useReducer(reducer,{value:0})

	return (
		<div>
			<p>현재 카운터 값은 <b>{state.value}</b>입니다</p>
			<button onClick={() =>dispatch({type : 'INCREMENT'})}>+1</button>
			<button onClick={() =>dispatch({type : 'DECREMENT'})}>-1</button>
		</div>
	)
}

export default ReduceCounter
```

다음과 같이 여러개의 스테이트 관리에도 리듀서를 적용가능

```jsx
import React,{useReducer} from 'react'
function reducer(state,action){
	return {
		...state,
		[action.name] : action.value
	}
}
function ReduceInfo() {
	const [state,dispatch] =useReducer(reducer,{
		name:'',
		nickname:''
	})
	const {name,nickname} =state
	const onChange = e =>{
		dispatch(e.target)
	}
	return (
		<div>
			<div>
				<input name="name" value={name} onChange={onChange}/>
				<input name="nickname" value={nickname} onChange={onChange}/>
			</div>
			<div>
				<div>
					<b>이름: </b>{name}
				</div>
				<div>
					<b>닉네임: </b>{nickname}
				</div>
			</div>
		</div>
	)
}

export default ReduceInfo
```

### useMemo

useMemo를 사용하면 특정 변수의 내용이 바뀔 때에만 함수를 호출할 수 있다(연산최적화)

```jsx
import React,{useState,useMemo} from 'react'

const getAverage = numbers =>{
	console.log('평균값 계산 중...')
	if (numbers.length ===0) return 0
	const sum = numbers.reduce((a,b) => a+b)
	return sum/ numbers.length
}

function Average() {
	const [list, setList] = useState([])
	const [number,setNumber] =useState('')
	const onChange = e =>{
		setNumber(e.target.value)
	}
	const onInsert =e =>{
		const nextList = list.concat(parseInt(number))
		setList(nextList)
		setNumber('')
	}
	const avg =useMemo(()=> getAverage(list),[list])
	return (
		<div>
			<input value={number} onChange={onChange}/>
			<button onClick={onInsert}>등록</button>
			<ul>
				{list.map((value,index) => (
					<li key={index}>{value}</li>
				))
				}
			</ul>
			<div>
				<b>평균값:</b> {avg}
			</div>
		</div>
	)
}

export default Average
```

위 예제에서 input값이 변경될 때마다 getAverage하면 불필요한 연산을 더 수행하는 셈이다.

이럴 때 useMemo를 통해 특정 값이 변경될 떄에만 실행할 함수를 지정할 수 있다.

### useCallback

방금 구현한 Avarage.js의 onChange선언부를 보자

```jsx
const onChange = e =>{
		setNumber(e.target.value)
	}
```

이렇게 선언하면 리랜더링 할때마다 함수를 새로 만들어야한다.

이는 useCallback으로 최적화 가능하다.

useCallback의 첫번쨰 파라미터는 생성하고싶은 함수

두번째 파라미터로는 배열 안에 어떤 변수가 바뀌었을 시 함수를 새로 생성할지 적는다.

```jsx
const onChange = useCallback(e =>{
		setNumber(e.target.value)
	},[])
	const onInsert =useCallback(()=>{
		const nextList =list.concat(parseInt(number))
		setList(nextList)
		setNumber('')
	},[number,list])//함수 내에서 상태값에 의존할 땐 꼭 두번째 파라미터에 넣어줘야해
```

### useRef

useref를 사용해 함수형 컴포넌트에서 ref를 쓸 수 있다

```jsx
function CallbackAverage() {
	const [list,setList] =useState([])
	const [number,setNumber] = useState('')
	const inputEl = useRef(null)//useRef 지정
...
return (
		<div>
			<input value={number} onChange={onChange} ref={inputEl}/>
			<button onClick={onInsert}>등록</button>
			<ul>
				{list.map((value,index) => (
					<li key={index}>{value}</li>
				))}
			</ul>
			<div>
				<b>평균값 : </b> {avg}
			</div>
		</div>
	)
}
```

다음과같이, 함수 컴포넌트에서 로컬변수(렌더링과 상관없는 변수)를 쓸 때도 useRef를 쓸 수 있다

```jsx
const RefSample =() =>{
	const id =useRef(1)
	const setId =(n) =>{
		id.current =n
	}
	const printId =() =>{
		console.log(id.current)
	}
	return (
		<div>refsample </div>
	)
}
```

### 커스텀 Hooks

여러 컴포넌트에서 비슷한 기능을 공유하는 경우 나만의 hook을 작성해 로직을 재사용가능. 또 다른 개발자가 만든 hooks도 설치해 쓸 수 있다.

```jsx
import  {useReducer} from 'react'

function reducer(state,action){
	return {
		...state,
		[action.name] : action.value
	}
}
export default function useInputs(initialForm){
	const [state,dispatch] = useReducer(reducer,initialForm)
	const onChange = e => {
		dispatch(e.target)
	}
	return [state,onChange]
}
```

```jsx
import React, {useState,useEffect} from "react"
import useInputs from "./useInput"

function Info() {
	const [state,onChange] = useInputs({
		name: '',
		nickname:''
	})
	const {name,nickname} =state

	return (
		<div>
			<input name="name" value={name} onChange={onChange}/>
			<input name= "nickname" value={nickname} onChange={onChange}/>
			<div>
				<b>이름 : </b> {name}
			</div>
			<div>
				<b>닉네임: </b> {nickname}
			</div>
		</div>
	)
}

export default Info
```

# 리뷰

원래 객체지향이 익숙해 클래스형이 낫지않나 싶었는데, 함수전달시 this바인딩 등 클래스 컴포넌트의 난잡한 부분이 있어서 함수형 컴포넌트를 선호하게되었다.

hooks를 사용해 함수형 컴포넌트에서 리액트의 다양한 기능들을 쓸 수 있게 되었어!

# 피드백

useEffect, useMemo, useCallback에서 두 번째 인자로 전달되는 리스트는 **“의존성”**이라고 합니다. 여기에 문자열이나 정수가 올 때는, 해당 값이 바뀌었을때만 리렌더됩니다.

하지만 오브젝트가 왔을때는 어떻게 될까요? `{a: 123} === {a: 123}`은 true일까요, false일까요? 리액트는 어떠한 기준으로 의존성의 동일성을 판단할까요?

이에 대한 대답을 준비해주시길 바랍니다.

---

useMemo, useCallback은 최적화에도 쓰이지만, 메모리 주소(즉, 오브젝트 동일성)를 유지하기 위해서도 많이 쓰입니다.

예를 들어서, 함수를 그냥 `const myFn = () => /* something */`으로 선언하면 매번 리렌더가 될때마다 함수가 생성되며, 메모리 주소 또한 변경됩니다. 이전 렌더에서 받으 `myFn`과 현재의 `myFn`을 `===`로 비교하면 `false`가 나오겠죠.

useMemo와 useCallback은 이러한 문제를 해결해줍니다. 이전 렌더의 `myFn`과 이후의 `myFn`의 메모리 주소 값을 유지시켜줍니다. (useMemo의 경우)의존성이 바뀔때만 값 생성자를 호출함으로서 의존성이 유지될때는 이전의 값을 계속 재사용할 수 있게 하죠.

한가지 더, **useCallback은 그 자체만으로는 성능 문제를 전혀 개선해주지 않습니다.** `useCallback`을 사용할때에도 함수의 생성은 여전히 이루어집니다. 그리고 React는 이렇게 생성된 함수를 **의존성이 바뀌지 않으면 그냥 버립니다**. 절대로 성능을 위한 선택은 아니죠.

사실, 함수의 생성은 JS에서 몹시 싼 편에 속하는 연산입니다. 최적화할 필요가 없습니다. 이 부분이 `useMemo`와 다른 부분이죠. `useMemo`는 최적화와 주소유지, 두가지 목적을 위해 쓰이지만 `useCallback`은 주소유지, 단 하나의 목적을 위해서 사용됩니다.

이렇게 주소를 유지하면 어떠한 점이 좋나고요? 우리가 지금까지 useMemo, useCallback, useEffect 뒤에 보내는 의존성 리스트가 실행하는 `===` 연산에서 동일성을 유지할 수 있죠.