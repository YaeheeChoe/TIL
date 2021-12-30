# Chapter 05: ref

Date: December 29, 2021

# 학습한 부분

Chapter 05 : ref

# 예제 코드

ref를 만드는 기본적인 방법. 이 콜백함수는 ref(래퍼런스) 값을 전달받아 이 값을 컴포넌트의 멤버변수로 지정한다.

```jsx
<input ref={(ref) => (this.input = ref)} />
//앞으로 this.input은 input요소의 DOM을 가리키게 됨.
```

책에서 createRef를 사용하는 방식도 소개하는데, 하나의 기능을 붙이는데 여기저기 건드려야하는 방식이 좋아보이지 않는다. 그래서 별다른 문제가 없다면 콜백함수를 쓰는 방법을 쓰려고 한다.

```jsx
handleButtonClick = () => {
  this.setState({
    clicked: true,
    validated: this.state.password === '0000',
  });
  this.input.focus();
  //이렇게 DOM요소에 접근할 수 있다
};
```

### 컴포넌트에 ref달기

리액트에서는 컴포넌트에도 ref를 달아 사용가능하다.

다음과 같이 ScrollBox 컴포넌트에 ref를 달아 다른 컴포넌트에서 scrollToBottom 메서드에 접근해 실행시켜주었다.

```jsx
export default class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <ScrollBox ref = {(ref) => this.scrollBox=  ref}/>
        <button onClick={() => this.scrollBox.scrollToBottom()}
					//여기서 화살표 함수로 굳이 새함수를 만들어준데엔 다 이유가 있습니다.
					// onClick() = {this.scrollBox.scrollToBottom} 도 문법상으론 맞지만
					// 컴포넌트가 처음 랜더링될 때는 this.scrollBox값이 undefined에요
					// 그래서 onClick()시점에서 값을 읽어와야 오류가 발생하지않아요
					// 이래서 함수컴포넌트 쓰는군요.
				>
          스크롤 아래로
        </button>
      </header>
    </div>
    )
  }

```

# 리뷰

슬슬 강력한 기능들이 하나씩 나오네요! 재밌어요!

# 피드백

🤩

createRef, this.ref는 보통 클래스 컴포넌트나 전역변수에 ref를 저장할 때 많이 쓰이는 방법이예요. 함수형 컴포넌트를 사용할때는 useRef()라고 하는 친구를 많이 사용합니다.(그리고, 함수형 컴포넌트에서 ref를 사용할때는 this.ref처럼 간단하게 사용할 수는 없어요. 무조건 createRef, useRef를 통해서만 사용해야 합니다.
