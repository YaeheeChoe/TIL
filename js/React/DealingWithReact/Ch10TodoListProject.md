# Chapter 10: 일정관리 웹 애플리케이션 만들기

Date: January 3, 2022

# 학습한 부분

Chapter 10: 일정관리 웹 애플리케이션 만들기

### react-icons

npm add react-icons

```jsx
import {MdAdd} from 'react-icons/md'
```

### styled component 실습!

```jsx
const InputBox = styled.input`
	background:none;
	outline:none;
	border: none;
	padding: 0.5rem;
	font-size: 1.125rem;
	line-height: 1.5;
	color: white;
	::placeholder{ /*내부의 속성에 접근하고싶을떄 */
		color: #dee2e6
	}
`
```

```jsx

//다음과같이 props를 바로 적용하기도 가능
color: ${(props) => props.color || "gray"};
```

# TODO List project

[TIL/js/React/DealingWithReact/Ch10TodoListProject/src at main · YaeheeChoe/TIL](https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/Ch10TodoListProject/src)

![1vaLMaTq1U.gif](Chapter%2010%20%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5%20%E1%84%8B%E1%85%B0%E1%86%B8%20%E1%84%8B%E1%85%A2%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8F%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5%20f18c5aed7b9248128a20d88dd430bb3d/1vaLMaTq1U.gif)

# 질문

npm audit fix 하면 패키지 설치시 오류가 자동으로 fix되던데, 이 명령어의 역할은 패키지 버전을 맞추어주는건가요?

audit fix는 가능한 하지 않는것이 좋고, 한다 하더라도 반드시 package-lock.json이나 yarn.lock을 백업하고 진행해야 합니다.(이전 커밋에 yarn.lock이나 package-lock.json이 있는 것정도로 충분합니다.)

audit fix는 패키지를 업그레이드해서 취약점이 있는 패키지를 최대한 없애는 커맨드입니다. 하지만 React, React Native, Expo 등 패키지의 버전이 고정되어있는 패키지들, 즉 업그레이드하면 오작동을 일으킬 수 있는 패키지가 설치된 프로젝트에서 npm audit fix를 하면 패키지들이 서로 호환되지 않는 버전으로 각가 업그레이드가 될 수 있어 오작동의 원인이 될 수 있습니다.

이번에 예희님이 npm audit fix를 했을때는 바로 React라이브러리를 설치하고 실행한 것이므로 큰 문제가 없을 수 있지만, 점점 최신 React와 프로젝트에서 사용하는 React의 버전 격차가 커질수록 오작동할 가능성이 높아집니다.(개인적으로 Expo에서는 메이저 버전 0~1개만 차이나도 바로 끔찍한 에러를 뱉어냈습니다.)

더 자세히 알고싶다면 다음 글을 읽어보세요. 왜 npm에서 알려주는 취약점 경고를 무시해도 되는지, 왜 npm audit fix를 사용하면 안되는지에 대해서 알려줍니다.

[Don't be alarmed by vulnerabilities after running NPM Install](https://www.voitanos.io/blog/don-t-be-alarmed-by-vulnerabilities-after-running-npm-install/)

# 리뷰

styled component 적용해서 써보니까 진짜 편하네요 WOW...

HTML/CSS나 CSS-MODULE같은 경우에는 컴포넌트와 스타일이 각기 다른 개념으로 취급되지만, styled-components는 “스타일은 당연히 컴포넌트에 종속되어야한다”라는 철학을 따르고있어서 컴포넌팅이 훨씬 용이하고 코드도 개발자 직관적입니다.

HTML/CSS는 DOM tree, CSS classes, 두 개의 데이터컬렉션을 관리해야 하지만, styled-components를 사용하면 component 데이터 컬렉션만 관리하면 되죠.

반면에 기존 클래스기반 스타일 변경을 지원하지 않는다는 단점 아닌 단점이 있습니다.(프로그래밍 자유도가 낮아지지만, 그만큼 체계적인 구조입니다. 프로그래밍 언어의 역사는 더 많은 기능을 추가하는 것이 아니라 더 많은 자유를 제한하는 방향으로 발전해왔다는 사실을 기억하세요. 스코프, 접근제어지시자, goto의 삭제 등)

# 피드백

`src/App.js` 23번째줄 `[todos]`가 아니라 `[todos, setTodos, nextId]`가 되어야 합니다.(나중에 등장하는 모든 `useCallback`을 활용하는 코드도 수정하셔야 합니다.

`useMemo`, `useEffect`는 의존하는 “상태”만 의존성에 추가하면 되지만, `useCallback`은 의존하는 “상태”와 “메소드”모두 의존성에 추가해야합니다!

`src/App.js` 12번째줄 꼭 필요한 경우가 아니라면 `useState`를 사용하는 편이 좋습니다.

`src/TodoInsert.js`의 40번째 줄 상태를 비롯한 모든 상태는 앱 페이지의 루트에서 관리하는편이 좋습니다. 즉, 루트를 다음과 같이 작성하고, 하위컴포넌트에서는 `useState`를 최소화하는거죠.

```jsx
// App.js 컴포넌트 내부
const [todoInput, setTodoInput] = useState('');
const [todos, setTodos] = useState([]);

const onCreateTodo = useCallback(
	() => {
		if (todoInput.length === 0) {
			return;
		}

		setTodos(
			(oldTodos) => {
				const id = getIdFromSomewhere();
				const newTodoItem = {
					id,
					body: todoInput,
				};
				return [newTodoItem, ...oldTodos];
			}
		);

		setTodoInput('');
	},
	[todoInput, setTodoInput]
);

return <>...
	<TodoInsert
		todoInput={todoInput}
		setTodoInput={setTodoInput}
		onSubmit={onCreateTodo}
	/>
...</>;
```

암튼 굽