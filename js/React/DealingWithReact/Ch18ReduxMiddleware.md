# Chapter 18: Redux Middleware

Date: January 11, 2022

# 학습한 부분

Chapter 18: Redux Middleware

1. 작업환경 준비
2. 미들웨어 직접 제작
3. redux-logger 사용
4. 미들웨어를 사용한 비동기 작업 관리

리덕스와 함께 비동기 작업을 관리해야한다면, 미들웨어를 사용해 효율적이고 편리하게 상태를 관리할 수 있다!

액션과 리듀서 사이의 중간자라고 볼수있음

액션 → 미들웨어 → 리듀서 → 스토어

# 예제 코드 - 미들웨어 제작

[TIL/js/React/DealingWithReact/ch18redux-middleware at main · YaeheeChoe/TIL](https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/ch18redux-middleware)

미들웨어는 결국 함수를 반환하는 함수를 반환하는 함수라고 할 수 있다.

![Capture.PNG](Chapter%2018%20Redux%20Middleware%20a2e42b39c8244422ad953136bd11af8c/Capture.png)

```jsx
// store : 리덕스 스토어
// action : 디스패치된 액션
// next(action)시 미들웨어에 액션을 넘겨주고, 미들웨어 없으면 리듀서에게 액션넘겨줌
const loggerMiddleware = store => next => action => {
  console.group(action && action.type); // 액션 타입으로 log 를 그룹화함
  console.log('이전 상태', store.getState());
  console.log('액션', action);
  next(action); // 다음 미들웨어 혹은 리듀서에게 전달
  console.log('다음 상태', store.getState()); // 업데이트 된 상태
  console.groupEnd(); // 그룹 끝
};

export default loggerMiddleware;
```

미들웨어 스토어에 적용

```jsx
const store = createStore(rootReducer,applyMiddleware(loggerMiddleWare))
```

미들웨어 라이브러리 사용

```jsx
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, ReduxThunk, sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
```

### thunk function

특정 작업을 나중에 하도록 미루기위해 함수형태로 감싼 것

```jsx
const addOne = x  =>x +1
function addOneThunk(x){
	const thunk = () => addOne(x)
	return thunk
}
```

### redux-thunk

thunk함수를 만들어 디스패치가능

다음은 1초 뒤에 increase를 수행하는 thunk생성함수 이다

```jsx
export const increaseAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
}
```

### 제너레이터 함수

함수에서 값을 순차적으로 반환가능

```jsx
function* generatorFunction(){
	console.log('hi')
	yield 1
	console.log('hi2')
	yield 2
	console.log('hi3')
	yield 3
	return 4
}
const generator = generatorFunction()
generator.next()
//hi
generator.next()
//hi2
...
```

### redux-saga

redux-saga를 사용하면 제너레이터 함수 기반으로 비동기작업을 관리할 수 있다.

```jsx
function* increaseSaga()
{
	yield delay(1000)
	yield put(increase())
}
export function* counterSaga(){
	// takeEvery: 들어오는 모든 액션에 대해 특정 작업 처리
	yield takeEvery(INCREASE_ASYNC,increaseSaga)
	// takeLatest: 젤 마지막으로 실행된 작업만 수행
	yield takeLatest(DECREASE_ASYNC,decreaseSaga)
}
```

루트사가 만들어주기

```jsx
export function* rootSaga(){
	yield all([counterSaga()])
}
```

# 질문

# 피드백

아마 Redux와 Redux-Saga, 그리고 JS 제너레이터는 이번에 처음 배우는 개념들이라서 많이 헷갈릴거예요.

Redux는 쓰면서 사용법을 좀 익혀야합니다. Redux-Saga는 이의 필요성을 알기 위해서는 Redux에서 async한 콜을 해서, Saga(나 Thunk) 없이 async 콜을 할때의 불편함을 알고있어야 배우기 쉽습니다. 마지막으로, Redux-Saga에서 사용하고있는 JS의 제너레이터라는 개념을 잘 숙지하고 있어야 합니다.

JS의 Generator는 직접 작성하는 경우는 Redux-Saga를 제외하고는 거의 없을 것입니다. 하지만 아것이 이 작동방식을 몰라도 된다는 뜻은 아닙니다. 사실 async-await는 js generator의 yield-next와 동일한 개념입니다.(단지 언어에서 사전 정의한 yield-next일 뿐이죠.) 이 외에도 yield-next의 개념은 알게 모르게 JS에서, 그리고 다른 함수형 언어에서 많이 사용하고 있습니다. 단지 그것이 yield-next(정확히는, 펑터-어플리커티브-모나드라는 개념)과 동일한 원리를 사용하고있다는 사실을 모르는채로 써왔을 뿐이죠.

JS의 제너레이터는 아래 글에서 잘 설명하고있으니 꼭 읽어보세요!

[제너레이터](https://ko.javascript.info/generators)