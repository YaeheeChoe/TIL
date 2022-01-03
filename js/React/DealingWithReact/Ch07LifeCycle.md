# Chapter 07: 라이프사이클

Date: December 30, 2021

# 학습한 부분

Chapter 07: 라이프사이클

![Capture.PNG](Chapter%2007%20%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%B3%E1%84%89%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%B3%E1%86%AF%20056568cf77144a5490b16bab7b04291d/Capture.png)

![Capture1.PNG](Chapter%2007%20%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%B3%E1%84%89%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%B3%E1%86%AF%20056568cf77144a5490b16bab7b04291d/Capture1.png)

# 예제 코드

라이프사이클 함수의 기능을 확인하기위한 코드

```jsx
import React, { Component } from 'react'

export default class LifeCycleSample extends Component {
	state = {
		number :0,
		color : null,
	}
	myRef = null
	constructor(props){
		super(props)
		console.log('constructor')
	}
	static getDerivedStateFromProps(nextProps, prevState){
		console.log('getDerivedStateFromProps')
		if(nextProps.color !== prevState.color)
		{
			return {color : nextProps.color}
		}
		return null
	}
	componentDidMount(){
		console.log('component did mount')
	}
	shouldComponentUpdate(nextProps, nextState){
		console.log('should component update', nextProps,nextState)
		return nextState.number % 10 !== 4
	}
	componentWillUnmount(){
		console.log('component will unmount')
	}
	handleClick =() =>{
		this.setState({
			number: this.state.number+1
		})
	}
	getSnapshotBeforeUpdate(prevProps,prevState){
		console.log('getSnapshotBeforeUpdate')
		if(prevProps.color !== prevState.color){
			return this.myRef.style.color
		}
		return null
	}
	componentDidUpdate(prevProps,prevState,snapshot){
		console.log('componet did update',prevProps,prevState)
		if(snapshot){
			console.log('업데이트 이전 색상 : ', snapshot)
		}
	}
	render() {
		console.log('render')
		const style ={
			color: this.props.color
		}
		return (
			<div>
				<h1 style ={style} ref={ref => this.myRef=ref}>
					{this.state.number}
				</h1>
				<p>color: {this.state.color}</p>
				<button onClick={this.handleClick}>
					더하기
				</button>
			</div>
		)
	}
}
```

다음과같이 App.js에서 랜덤컬러 설정 후 LifeCycleSample 컴포넌트에 color값을 넘겨주도록 했다.

```jsx
import React, { Component } from 'react'
import LifeCycleSample from "./LifeCycleSample"
function getRandomColor(){
  return '#' +Math.floor(Math.random() * 167772115).toString(16)
}

export default class App extends Component {
  state = {
    color : '#000000'
  }
  handleClick = () =>{
    this.setState({
      color:getRandomColor()
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color}/>
      </div>
    )
  }
}
```

![rOMHsXMccC.gif](Chapter%2007%20%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%B3%E1%84%89%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%B3%E1%86%AF%20056568cf77144a5490b16bab7b04291d/rOMHsXMccC.gif)

잉? 컬러코드가 변경되는데 색상은 안바뀌는 경우가 생긴다.

![QS5DPTLRQB.gif](Chapter%2007%20%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%B3%E1%84%89%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%B3%E1%86%AF%20056568cf77144a5490b16bab7b04291d/QS5DPTLRQB.gif)

로그는 정직하게 나오는데....뭐가 문젤까>

![mo9Ji50EjS.gif](Chapter%2007%20%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%B3%E1%84%89%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8F%E1%85%B3%E1%86%AF%20056568cf77144a5490b16bab7b04291d/mo9Ji50EjS.gif)

# 질문

- 이론 상 버튼을 누르면 App의 this.state가 update 되면서 리렌더링 → 자식 컴포넌트인 LifeCycleSample 리랜더링 → 숫자 컬러 변경이 매번 실행되어야 하는데....숫자 컬러가 버튼 누를 떄마다 바뀌는게 아니라 n회에 한번씩 바뀌어요. 이런건 어떻게 해결해야할까요?
    - 아앗 예희님... 왜 컬러헥스코드가 7자리가 나오는 건가요... 6자리일때만 반영되고, 7자리일때는 반영되지 않아서 발생한 문제입니다.

# 피드백

오늘 배운부분은 React를 이해하는데 어느정도 도움을 줄 수 있지만, 실제 React 개발을 하는데 많이 사용되지는 않습니다. 특히 앞으로 계속 사용될 함수형 컴포넌트에서는 쓸수 없는 개념들이고요.

따라서 “이러한 것이 있다” 정도로만 이해하는 편이 좋습니다.