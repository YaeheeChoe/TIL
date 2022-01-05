# Chapter 11: 컴포넌트 성능 최적화

Date: January 4, 2022

# 학습한 부분

Chapter 11: 컴포넌트 성능 최적화

## 불변성은 매우 중요합니다!

불변성이 지켜지지않으면 객체 내부의 값이 새로워져도 바뀐 것을 감지하지 못합니다. 그러면 React.memo에서 서로 비교해 최적화하는게 불가능하겠쬬?

### 전개 연산자(...)이거 얕은복사임

가장 바깥쪽에 있는 값만 복사되므로, 내부 값이 객체 혹은 배열이라면 내부의 값 또한 따로 복사해 주어야 한다.

JS에서 깊은 복사는 없습니다. 오직 얕은 복사만 있을뿐이죠.

사실 불변성이 지켜진다면 깊은 복사는 굳이 필요 없습니다. 만약 얕은 복사가 문제가 된다면 그건 불변성 원칙을 지키지 않아서죠. 예를 들자면, 불변성이 유지되는 코드를 작성할때는 다음과 같은 스타일의 코드를 사용해서는 안 됩니다.

```jsx
x.name = 'Changed Name'; // Bad

const newX = {...x, name: 'Changed Name'}; // Good
```

# 예제 코드

무야호ㅋㅋㅋ

최적화 수정본

근데 react-virtualized가 안되서 그 이전 커밋까지만 올림

react-virtualized는 아마 알고있겠지만, 수많은 리스트 형태의 컴포넌트(즉, `.map`을 사용해서 렌더링하는 컴포넌트)를 렌더링할 때 실제 화면에는 렌더링되지 않지만 DOM에서는 렌더링되는 컴포넌트를 최적화하는 라이브러리입니다.

어떤 분야이던 프론트엔드 개발을 하다보면 이렇게 픽셀 렌더링단계까지는 오지 않지만 렌더링 데이터로 남아 성능을 잡아먹는 경우가 있습니다. 그리고 대부분 프론트엔드 프레임워크는 이러한 문제에 대한 솔루션을 가지고 있고요. 예를 들어 React Native에는 FlatList([https://reactnative.dev/docs/flatlist](https://reactnative.dev/docs/flatlist))라고 하는 유사한 솔루션을 가지고 있습니다.

**이러한 라이브러리는 정말, 꼭 필요할때만 사용하세요**. 정말 대부분의 경우는 FlatList를 필요로하지 않습니다.(제가 지금까지 여러 프론트엔드 앱을 개발해봤지만 단 한번도 FlatList나 react-virtualized를 필요로하는 경우는 없었습니다. 아마 주식앱을 만들게된다면 필요할수도 있겠네요)

[https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/Ch10TodoListProject](https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/Ch10TodoListProject)

## 컴포넌트를 최적화하는 방법

### React.memo()

컴포넌트의 props가 바뀌지 않으면 리렌더링 되지않게 해준다

`React.memo`는 Higher-Order Component입니다. 컴포넌트를 받고 컴포넌트를 리턴하는 함수이죠.

HOC는 앞으로 React를 공부할 때 자주 등장할 개념이니 따로 검색해서 알아두는 편이 좋습니다.(여기에서 설명하기에는 여백이 부족하므로... ㅎㅎ)

```jsx
export default React.memo(TodoListItem) // 요로코롬 React.memo()로 감싸서 export하기만하면댐
```

### useState의 함수형 업데이트

그런데, TodoListItem의 prop인 onRemove, onToggle은 todos 배열이 업데이트 될 떄마다 업데이트되게 되어있다. (useCallback의 두번째 인자)

```jsx
const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos,setTodos,nextId],
  )
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>  todo.id === id ? { ...todo, checked: !todo.checked}:todo,),
      )
    },[todos,setTodos,nextId],
  )
```

이럴 때 useState의 함수형 업데이트를 쓴다. 요컨대 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해주는 업데이트 함수를 넣어주는 것이다.

이렇게 하면 useCallback으로 정의한 함수 내에서 State를 쓰지 않아도 되므로, state의 변경에 따라 함수를 업데이트할 이유도 사라진다.

새로운 접근방식이네요 ㅎㅎ

사실 useState에서 함수를 사용하는 이유는 레이스 컨디션(Race Condition)을 방지하기 위해서가 가장 큽니다. 예를 들어, `setState(state + 1)`두 개가 동시에 호출되면 가끔 한 쪽이 무시될수 있습니다.(이유는 동시에 호출되는 경우 둘 모두 `state` 값이 `1`일수도 있기 때문입니다.) 하지만 `setState(curState => curState + 1)`를 사용하게 되면 `setState`가 아무리 많이 호출되어도 호출된 횟수만큼 `state`의 값이 증가하겠죠.

근데 생각을 해보니까 정말로 setState안에서만 상태에 접근한다면 상태 의존성 등록은 안해도 되겠네요 ㅎㅎ(물론 setState 밖에서 상태가 필요한 경우도 있기 때문에 이득을 볼 수 있는 상황이 자주 등장하지는 않을 것 같습니다.)

**아, 그런데 `setTodos`는 의존성으로 등록해줘야 합니다!** `todos`야 `setTodos`가 제공하는 파라미터이니 의존성에서 빼도 되겠지만 `setTodos`는 엄연히 컴포넌트 스코프에 있는 `setTodos`를 가져오는 것이니까요.

```jsx
const onRemove = useCallback(
    (id) => {
      setTodos(todos=> todos.filter(todo => todo.id !== id));
    },
    [],
  )
  const onToggle = useCallback(
    id => {
      setTodos(
        todos => todos.map(todo =>  todo.id === id ? { ...todo, checked: !todo.checked}:todo,),
      )
    },[],
  )
```

### useReducer() 로 업데이트 분리

위와 유사한 방법으로 useReducer를 사용해서 업데이트 부분을 분리해 줌으로써 최적화하는 방법도 있다.

```jsx
function todoReducer(todos,action){
  switch(action.type){
    case 'INSERT':
      return todos.concat(action.todo)
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id)
    case 'TOGGLE':
      return todos.map(todo => todo.id === action.id ? {...todo,checked: !todo.checked}: todo)
    default:
      return todos
  }
}
```

### 근데 2500개 다 렌더링할거임?

화면에 보이는 ListItem이 겨우 열 몇개임에도 모든 List Item을 리렌더링하는것은 넘넘 비효율적이다.

아래 코드에서 Todo List 는 todos에 변동이 있을 때마다 2500개의 item을 리렌더링 하게된다.

```jsx
const TodoList = ({todos,onRemove,onToggle}) => {
	return (
		<List>
			{todos.map(todo => (<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>))}
		</List>
	)
}
```

### react-virtualized

이럴 떄 react-virtualized가 유용하다.

교재에 styled component와 함께 쓰는 방법이 나와있지않아 아래 링크를 참고했다.

ㅠㅠ?

안된다.

스타일이 깨져서인가...?

삽질했다...

# 질문

<aside>
❓ styled component에서 style을 넘겨주는 과정에서 뭔가 잘못된 것인지, Tag 이름을 넘겨주는 것이 잘못된 것인지 react-virtualized가 제대로 작동하지않아요. react-virtualized와 styled component를 함께 쓸 때 주의사항이 있을까요?

</aside>

[Styled Components](https://codesandbox.io/s/xvrvv8w9np?file=/index.js)

styled-components가 기본 엘리먼트가 아닌 커스텀 엘리먼트를 스타일링할때는 `className`값이 정상적으로 포워딩되어야합니다.

[styled-components: Basics](https://styled-components.com/docs/basics#styling-any-component)

하지만 react-virtualized는 순수한 CSS를 오버라이딩하거나 인라인 CSS를 사용하는 방법으로만 스타일링을 할 수 있도록 해두었습니다.

[react-virtualized/customizingStyles.md at abe0530a512639c042e74009fbf647abdb52d661 · bvaughn/react-virtualized](https://github.com/bvaughn/react-virtualized/blob/HEAD/docs/customizingStyles.md)

따라서 styled-component가 뿌려준 `className`이 react-virtualized의 컴포넌트로 전달되지 않으므로, react-virtualized의 모든 컴포넌트는 `styled-components`로 스타일링이 불가능하다고 말할 수 있습니다.

대신, 딱 이 부분만 inline css(js object)로 스타일링하세요! 다행이도, 테이블 자체가 아니라 내부에 보내는 자식 컴포넌트는 react-virtualized가 제공하는 것이 아니므로 styled-component를 사용할 수 있습니다.

# 피드백

굽