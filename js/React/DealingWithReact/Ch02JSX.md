# Chapter 02: JSX

Date: December 26, 2021

# 학습한 부분

Chapter 02: JSX

### let, const, var

var : 스코프가 함수단위

let, const : 스코프 블록단위

const : 상수

### JSX 굳이 괄호로 안감싸도 됨

갠적으로 안감싸는게 깔끔해서 좋네요

### 리액트는 스타일 적용시 낙타표기법 사용

- class 대신 className
- background-color 아님 backgroundColor

# 예제 코드

삼항연산자와 리액트 주석 실험

```jsx
import logo from './logo.svg';
import './App.css';

function App() {
  const name = '뤼액트'
  const number =0
  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p //조건연산자
        >
          {name && '리액트입니다'}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        <>
          {name ==='리액트'? 
            <h1>Learn React</h1>
          :
            <h1>//주석을 이렇게 쓰시면 안됩니다.</h1>
            /*주석2 */
          }
        </>
        </a>
      </header>
    </>
  );
}

export default App;
```

### && 연산

```jsx
name = undefinded
{name && '리액트입니다'}
```

```jsx
const number =0
{number && '리액트입니다'}
```

### 삼항연산자 if

if문 대신 삼항연산자를 사용해 조건부 렌더링이 가능하다

```jsx
{name ==='리액트'? <h1>Learn React</h1> : <p>띠용?</p>
```

### 주석쓰기

```jsx
<h1>//주석을 이렇게 쓰시면 안됩니다.(태그않에 넣으면 화면에 다나옴)</h1>
<p // 이렇게는 쌉가능
></p>
/*요롷게도*/
```

# 질문

# 피드백

잘 하셨습니다. 예제코드도 오늘 공부하신 부분을 대부분 보여주도록 잘 작성하셨고요.

책에서 다루지 않은 부분을 추가하자면, 다음과 같은 연산자도 사용할 수 있습니다.

```jsx
x && <span>x는 truthy한 값입니다.(null, undefined, 0, false 등의 값이 아님)</span>
x || <span>x는 falsy한 값입니다.(null, undefined, 0, false 등의 값임)</span>
x ?? <span>x는 null 또는 undefined입니다.(||과 유사하지만 false는 포함하지 않음)</span>
```