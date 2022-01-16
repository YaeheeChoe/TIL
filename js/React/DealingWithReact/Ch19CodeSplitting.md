# Chapter 19: Code Splitting

Date: January 12, 2022

# 학습한 부분

Chapter 19: Code Splitting

1. js 함수 비동기 로딩
2. React.lazy와 Suspense를 통한 컴포넌트 비동기 랜더링
3. loadable componens를 통한 컴포넌트 비동기 렌더링

### 코드스플리팅이란

코드를 여러 파일로 나누어 저장하는것을 말함

### 코드 비동기 로딩

코드 스플리팅 기법 중 하나.

js 함수, 객체, 컴포넌트 등을 각각 다른 파일로 저장해두고 필요한 시점에 불러와 사용함으로써

로딩속도를 개선하고 사용자경험을 증진

# 예제 코드

### dynamic import

이렇게 하면 import 한 코드가 자동으로 분리된다.(코드 스플리팅 확인)

라이브러리 없이 코드 스플리팅을 수행하려면 state와 dynamic import를 사용한다.

```jsx
function App() {
  const onClick = () => {
    import('./notify').then((result) => result.default())
  }
  return <p onClick={onClick}>Hello js!</p>
}
```

## React.lazy와 Suspense를 사용한 간단한 코드스플리팅

### React.lazy

컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩

```jsx
const SplitMe = React.lazy(()=>import('./SplitMe')
```

### Suspense

리액트 내장 컴포넌트

스플리팅된 컴포넌트 로딩, 로딩이 끝나지않았을 때 보여줄 UI 설정

```jsx
import {Suspense} from 'react'
<Suspense fallback={<div>loading...<div/>}><SplitMe/></Suspense>
```

![whale_1dwvnDnxxp.gif](Chapter%2019%20Code%20Splitting%20a1624935b8c84657be005f9da5b6c6ce/whale_1dwvnDnxxp.gif)

### Loadable Component를 사용한 코드 스플리팅

서버사이드 렌더링 지원. 렌더링 전에 스플리팅된 파일 미리 불러오기 가능.

```jsx
const SplitMe = loadable(() => import('./SplitMe'))

function App() {
  const [visible, setVisible] = useState(false)
  const onClick = () => {
    setVisible(!visible)
  }
  return (
    <>
      <p onClick={onClick}>Hello js!</p>
      {visible && <SplitMe /> /* 따로 suspense를 해줄 필요X*/}
    </>
  )
}
```

다음과같이 fallback 지정도 가능

```jsx
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>,
})
```

preload

```jsx
const onMouseOver = () => {
    SplitMe.preload()
  }
```

![whale_FCctO4R11V.gif](Chapter%2019%20Code%20Splitting%20a1624935b8c84657be005f9da5b6c6ce/whale_FCctO4R11V.gif)

# 질문

# 피드백

SPA 프레임워크와 DOM Router(React Router 등)가 도입되면서 단순히 한 웹페이지를 여는데도 해당 도메인의 모든 페이지를 로딩해야 하는 문제가 발생하였습니다.(메인페이지 하나 로딩하는데 상품 상세부터 마이페이지까지 다 로딩되는 격입니다.) 따라서 사용자에게 당장 보여지는 부분만 로딩하고 렌더링하는 기능의 필요성이 대두되었죠.

일부 페이지는 DOM Router와 상관없이도, 그 자체에 너무 무거운 기능이 있어(주식 차트를 렌더링한다던지) 코드 스플리팅을 사용하는 경우가 있습니다.

코드 스플리팅은 보통 개발 초반에는 많이 사용하지 않습니다. 따라서 당장 자세히 알 필요는 없습니다.(예제정도만 실행해보면 됩니다.)

나중에 서비스가 커지고, 트래픽 관리와 로딩속도가 중요해지는 시점이 오면 좀 더 심도있게 고민해야하는 때가 올거예요.