# Chapter 04: 이벤트 핸들링

Date: December 28, 2021

# 학습한 부분

Chapter 04: 이벤트 핸들링

### 리액트 이벤트시스템 주의사항

1. 이벤트명은 카멜 표기법
2. 이벤트에 함수 전달할 것
3. DOM요소에만 이벤트 전달 가능

### 클래스 컴포넌트에서 이벤트 사용시 주의사항

- HTML에 이벤트로 등록되는 과정에서 메서드와 this의 관계가 깨진다.
- 그래서 this는 따로 바인딩 해줘야함

### e의 정체

- SyntheticEvent로 웹브라우저의 네이티브 이벤트를 감싸는 객체
- 네이티브 이벤트와 인터페이스 같음
- SyntheticEvent는 이벤트가 끝나면 초기화된다

# 예제 코드

함수형 컴포넌트를 사용하여 input을 두 개 받아 Event 처리를 통해 State에 저장하는 코드를 작성해보았다.

![ygH3wzKT18.gif](Chapter%2004%20%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A6%E1%86%AB%E1%84%90%E1%85%B3%20%E1%84%92%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC%2010d13cca9d90478c9aa30b1bdd27322d/ygH3wzKT18.gif)

```jsx
import React,{useState} from "react"
const MyEvent = () => {
	// form에 object형으로 state를 받아 여러개의 인풋 처리에 용이하게 함
	const [form,setForm] = useState({
		username:'',
		message:''
	})
	const {username,message} = form
	const onChange = e =>{
		setForm({
			...form,
			[e.target.name] : e.target.value
		})
	}
	const onClick = () =>{
		alert(username +':'+message)
		setForm({
			username: '',
			message:''
		})
	}
	const onPressKey = e => {
		if(e.key == 'Enter')
		{
			onClick()
		}
	}
	return(
	<div>
		<h1>이벤트 연습</h1>
		<input
			type="text"
			name="username"
			placeholder="사용자명" 
			onChange={onChange}
			value={username}
			onKeyPress={onPressKey}/>
		<input
			type="text"
			name="message"
			placeholder="메세지" 
			onChange={onChange}
			value={message}
			onKeyPress={onPressKey}/>
		<button onClick={onClick}>확인</button>

	</div>)
}

export default MyEvent
```

# 질문

- setForm형식으로 state처리시 기존 form 을 ...로 복제 후 update해주는데, 이런식으로 처리하면 성능이 더 안좋아질거같아요. 매번 이렇게 처리해도 성능상 문제가 없을까요?
    - 보통은 성능문제가 없습니다. Redux같이 한 앱의 모든 상태를 하나의 state에 저장하는 경우도 있습니다.
        
        그리고 ... 복사는 얕은 복사라서 실제로는 수십 바이트~수백바이트 정도의 메모리 복사와 할당이 일어나는 것으로 알고있는데, 이정도는 보통 성능에 큰 영향을 주지 않습니다.
        
- State에서 처리해야할 정보가 아주 많은경우 어떻게 처리하나요? State를 1000개쯤 만들어야하면...? Update시 부하를 방지하기위한 방법론이 있나요?
    - 이전에 설명하였듯이, React에서는 변수가 아니라 state를 사용하는 이유는 rerender를 하는 시기와 범위를 개발자가 별도로 함수를 호출하지 않고도 추적할 수 있도록 하기 위함입니다.
        
        한 UI가 state를 1000개쯤 렌더링해야하나요? 그렇다면 1000개의 상태를 관리하고 렌더링하는 것은 마땅히 지불해야하는 비용입니다.
        
        하지만 일반적으로는 상태(즉, 데이터)는 1000개이지만 한 UI에서는 많아봐야 4~10개 정도만 렌더링하겠죠. 그런 상황이라면 데이터는 변수, 또는 로컬 DB(PouchDB, Realm, IndexDB 등)에 상태를 저장하고, 실시간으로 변동되며 이를 UI에 반영해야하는 상태만 state로 분리하여 관리하면 상태가 1000개씩 필요한 경우는 없을거예요.
        

# 피드백

오늘도 좋아요!

위 책에서는 여러개의 change 함수를 하나로 합쳐서 관리하였는데, 저는 별로 권장하지 않는 방법입니다.(clean code를 위하여..!)

하나의 상태를 만들되, 여러 setter를 사용하는 것을 추천합니다. 아래 예시가 있습니다.

```jsx
const [state, setState] = useState({name: '', age: 18});
const onNameChange = (event) => {
	setState({...state, name: event.target.value});
};
const onAgeChange = (event) => {
	// 이것이 하나의 onChange를 쓰면 안되는 이유중 하나입니다.
	// 문자열 데이터만 받으면 위 책에서 말한 방법을 사용할수도 있지만,
	// 저희가 받는 데이터는 문자열 뿐 아니라 수치, 논리형, 파일, 옵션(라디오 버튼) 등의 데이터도
	// 있다는 사실을 간과해서는 안됩니다.

	// 문자열을 숫자로 캐스팅하며,
	// 올바른 숫자가 아닌 경우 이를 상태에 반영하지 않습니다.
	const numValue = Number(event.target.value);
	if(Number.isNaN(numValue)) {
		return;
	}

	setState({...state, name: numValue});
};
```