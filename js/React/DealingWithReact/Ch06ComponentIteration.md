# Chapter 06: 컴포넌트 반복

Date: December 29, 2021

# 학습한 부분

Chapter 06: 컴포넌트 반복

# 예제 코드

### 자바스크립트의 map

map는 다음과같이 기존 배열로 새로운 배열을 만드는데 사용된다.

```jsx
var numbers = [1, 2, 3, 4, 5];

var processed = numbers.map((num) => num * num);
console.log(processed);
// (5) [1, 4, 9, 16, 25]
```

### 데이터 배열을 컴포넌트 배열로 반환하기

같은원리로, 기존 배열을 가지고 컴포넌트배열을 생성할 수 있답니다.

```jsx
const IterationSample = () => {
  const names = ['js', '뷰', '리액트', 'HTML', 'CSS'];
  const nameList = names.map((name, i) => <li key={i}>{name}</li>);
  //key : Virtual DOM에서 어떤 원소가 변화했는지 알아내기위해 React가 요소에 부여하는 고유번호
  //key값은 항상 유일해야함. 주의.
  return <ul>{nameList}</ul>;
};
export default IterationSample;
```

### 응용해서 요소 추가 및 삭제를 해봅시다

```jsx
import React, { useState } from 'react';
const IterationSample = () => {
  const [names, setNames] = useState([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' },
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);

  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    // 리액트의 불변성 유지(기존 상태는 그대로 두면서 새로운 값을 상태로 설정)
    // 를 위해 기존 상태에 push하는 대신 concat으로 새 요소를 만들어주고 덮어씌운다
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText('');
  };

  const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);
  return (
    <>
      <input value={inputText} onChange={onChange}></input>
      <button onClick={onClick}>Add</button>
      <ul>{nameList}</ul>
    </>
  );
};
export default IterationSample;
```

###

# 질문

- 전체 프로그램에서 각각의 key값을 유일하게 부여하기가 쉽지않을거같은데요🤔. key값을 고유하게 부여하는 Tip이 있을까요?
  - 일반적으로 여러 element를 사용하는 경우, 항상 id가 있기 마련입니다. RDBMS의 auto-increment int형 id나, 몽고DB의 \_id등이 있죠. 일반적으로는 이런 id를 문자열로 캐스팅하여 사용하시면 됩니다.
    만약 id가 없는 경우라면, 리스트 전체가 하나의 데이터로 사용되는 경우일 수 있습니다. 이러한 경우에는 단순히 index를 key로 사용해도 무방합니다.
    Dropdown UI 등을 구현할때는 개발자가 임의로 리스트를 만드는 경우가 있는데, 이럴때는 index를 사용하지 말고 개발자가 직접 키를 넣어주는 것이 올바릅니다.
    ```jsx
    ['qwer', 'asdf', 'zxcv'].map(
      (
        label,
        labelIndex /* map이 받는 함수의 두번째 값으로는 현재의 인덱스가 옵니다. for문의 i같은. */
      ) => {
        return <span key={labelIndex}>{label}</span>;
      }
    );
    ```
    ```jsx
    [
      {
        id: 'open', // 개발자가 임의로 지정한 id 코드네임
        label: '열기',
        action: (context) => context.doSomething1(),
      },
      {
        id: 'save',
        label: '저장하기',
        action: (context) => context.doSomething2(),
      },
      {
        id: 'close',
        label: '닫기',
        action: (context) => context.doSomething3(),
      },
    ];
    ```

# 피드백

🤩
