# Chapter 03: 컴포넌트

Date: December 27, 2021

# 학습한 부분

### Chapter 03: 컴포넌트

- 컴포넌트
- props
- state

# 예제 코드

## 컴포넌트를 생성하는 방법

### 클래스형 컴포넌트

스니펫 쓰면 rcc로 생성할 수 있다

```jsx
import React, { Component } from 'react'

export default class MyClassComponent extends Component {
	render() {
		return (
			<div>
				나의 멋진 클래스 컴포넌트!
			</div>
		)
	}
}
```

### 함수형 컴포넌트

스니펫 쓰면 rfce로 생성가능

```jsx
import React from 'react'

function MyFunctionalComponent() {
	return (
		<div>
			나의 멋진 함수형 컴포넌트!
		</div>
	)
}

export default MyFunctionalComponent
```

### 화살표 함수형 컴포넌트

스니펫 쓰면 rch로 생성가능

```jsx
const MyComponent = () => {
	return <div>나의 멋진 커스텀 Hooks!</div>
}

export default MyComponent
```

## props : 인자전달

```jsx
const MyComponent = props => {
	return <div>나의 멋진 {props.name}</div>
}

export default MyComponent
```

ES6의 destructuring assignment문법을 사용해 더 직관적으로 인자를 전달가능하다.

파라미터가 객체라면 구조를 분해해 각각의 값으로 사용하는 것

```jsx
const MyComponent = ({name}) => {
	return <div>나의 멋진 {name}</div>
}

export default MyComponent
```

생성한 컴포넌트를 다음과같이 사용가능하다

![QCh4Q5kHjJ.gif](Chapter%2003%20%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%20bd120cc97df04a618fcbe8ddb757d22c/QCh4Q5kHjJ.gif)

```jsx
import logo from './logo.svg';
import './App.css';
import MyComponent from './MyComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
        <MyComponent name = "React"/>  // <-요롷게 사용가능
      </header>
    </div>
  );
}

export default App;
```

클래스형 컴포넌트 사용 시 render 함수 내에서 다음과같이 접근하면 된다

```jsx
const {name, number}  = this.props
```

### defaultProps, PropTypes

```jsx
import PropTypes from 'prop-types'
MyComponent.defaultProps = {
	name: '기본이름' // 기본 인자 지정 가능
}
MyComponent.propTypes = {
	name: PropTypes.string // prop의 자료형 지정 가능. 문자열이 아닌 값이 들어올 시 콘솔에 에러
}
```

## state

state는 컴포넌트 내부에서 바뀔 수있는 값을 의미한다.

### 클래스 컴포넌트에서 사용하기

![xywtuOeJAV.gif](Chapter%2003%20%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%20bd120cc97df04a618fcbe8ddb757d22c/xywtuOeJAV.gif)

다음과같이 버튼을 누르면 state.number값이 1씩 증가하는 예제를 만들어보았다.

```jsx
import React, { Component } from 'react'

export default class Counter extends Component {
	constructor(props){
		super(props)
		this.state ={
			number :0
		}
	}
	render() {
		const {number} = this.state
		return (
			<div>
				<h1>{number}</h1>
				<button
				onClick={()=>{
					this.setState({number:number+1})
				}}> +1
				</button>
			</div>
		)
	}
}
```

### 함수 컴포넌트에서 useState사용하기

![qu1paiK4YI.gif](Chapter%2003%20%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%20bd120cc97df04a618fcbe8ddb757d22c/qu1paiK4YI.gif)

```jsx
import React, {useState} from "react"
const Say = () => {
	const [message ,setMessage] = useState('')//배열 비구조화 할당
	const onClickEnter = () => setMessage('안녕하세요')
	const onClickLeave = () => setMessage('안녕히가세요')

	return (
		<div>
			<button onClick={onClickEnter}>입장</button>
			<button onClick={onClickLeave}>퇴장</button>
			<h1>{message}</h1>
		</div>
	)
}

export default Say
```

useState('')는 배열을 반환하는데, 첫번째 원소는 현재 상태값, 두번째 원소는 Setter함수이다.

state값 변경시 반드시 Setter함수를 사용해주어야한다.

# 질문

- props = properties = 인자 라고 받아들이는게 맞는 개념인가요?
    - 맞는 개념입니다.
        
        좀더 부연설명을 하자면, props와 state 모두 “상태”라고 하는 개념입니다.
        
        상태는 현재 앱이 어떠한 “상태”인지 저장하고 있기때문에 상태라고 불립니다.
        
        예를 들어서, `user.name`은 현재 로그인된 유저의 이름이 어떠한지에 대한 상태를 저장하고 있는것이죠.
        
        props와 state의 차이는 내가 이 상태를 수정할수 있는지, 없는지에 대한 차이입니다.
        
        state는 이를 소유하고있는 컴포넌트가 이를 수정할 수 있죠(setState).
        
        props는 위의 컴포넌트에서 내려보내주는, 인자와 같은 개념이므로 컴포넌트가 이를 수정할 수 없습니다.
        
        일반적인 함수의 인자와 props의 차이는 값과 상태의 차이라고 볼수 있습니다. 함수의 인자는 값이고, 당연히 수정되지 않습니다. 하지만 props와 같은 경우에는 상태이므로 상위 컴포넌트에 의해서 값이 수정될 수 있죠.
        
- 리액트에서 그냥 변수를 쓰지않고 state를 쓰는 이유가 무엇인가요?
    - 언제 어느 부분을 rerender를 해야하는지 명확하게 알기 위해서입니다.
        
        이전에 Qt와 같은 GUI 라이브러리는 상태를 변수에 저장하였습니다.
        
        그리고 이러한 변수를 화면에 렌더링하였죠.
        
        하지만 렌더리은 비싼 작업입니다. 항상 화면전체를 리렌더하는 것은 일반 웹/앱 소프트웨어를 만드는데 적절한 방법이 아닙니다.(이러한 방법이 적절한 곳도 있습니다. 게임엔진, 시뮬레이션 등 매 프레임마다 전체 픽셀이 바뀔 가능성이 있는 분야가 그렇습니다.)
        
        Qt에서는 이 문제를 개발자가 적절한 시기에 rerender()를 호출하는 방식으로 해결하였습니다.
        
        하지만 이러한 방법은 변수는 바뀌었지만 rerender()는 호출되지 않는 문제도 있고, 개발자가 로직 중간중간에 rerender()라는, 로직과 전혀 상관없는 함수 콜을 해서 코드를 더럽히는 문제가 있었습니다.
        
        심지어 rerender()를 호출할때는 ~픽셀부터 ~픽셀의 범위까지 리렌더를 해야하는지 지정해야 했었습니다.(아니면 전체 위젯을 리렌더했습니다. 성능상 좋은 판단은 아니죠)
        
        [https://doc.qt.io/qt-5/qwidget.html#repaint-1](https://doc.qt.io/qt-5/qwidget.html#repaint-1) 여기 Qt::QWidget::repaint() 함수를 보면 QRect라는, 리렌더하는 범위를 지정하여 리렌더하는 함수가 있습니다.
        
        따라서 React, Vue 등의 모던 프레임워크는 전부 본인들의 상태관리 라이브러리나 Redux, Mobx, Apollo 등의 외부 상태관리 라이브러리를 통해 개발자가 앱의 상태관리를 할 수 있도록 하였습니다.
        
        이러한 라이브러리는 특정 컴포넌트의 상태가 수정되면 해당 컴포넌트가 차지하는 부분만 계산하여 자동으로 rerender()를 호출해주죠.
        
- 화살표함수형으로 컴포넌트를 생성하는 것을 react custom hooks라고 부르던데, 화살표함수형으로 컴포넌트 생성(하면서 쓰는 도구들 useState등) = react hook인가요?
    - 아닙니다. 훅(hook)과 컴포넌트(component)는 다른 개념입니다. 화살표 함수, 일반 함수, 클래스 등 이들을 구현하는 방식과는 상관없습니다.
        
        hook는 element를 리턴하지 않는 함수입니다. 아무것도 리턴하지 않아도 되고, 목적에 따라서 함수나 상태 등을 리턴할수도 있죠.
        
        반면에 component는 항상 엘리먼트를 리턴해야합니다. `<div/>`와 같이 생긴 친구들을 말이죠.
        

# 피드백

오늘도 잘하셨습니다!