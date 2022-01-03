# Chapter 09: 컴포넌트 스타일링

Date: January 2, 2022

# 학습한 부분

Chapter 09: 컴포넌트 스타일링

### 건너뜀

sass loader 

## BEM

[Block, Element, Modifier](https://nykim.work/15)

block__element—modifier

# 예제 코드

### Sass : 더 멋진 css 문법

```sass
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c7cfa;
$violet: #7950f2;

@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}
```

```sass
@import './utils';
.SassComponent {
  display: flex;
  .box {
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &.red {
      background: $red;
      @include square(1);
    }
    &.orange {
      background: $orange;
      @include square(2);
    }
    &.yellow {
      background: $yellow;
      @include square(3);
    }
    &.green {
      background: $green;
      @include square(4);
    }
    &.blue {
      background: $blue;
      @include square(5);
    }
    &.indigo {
      background: $indigo;
      @include square(6);
    }
    &.violet {
      background: $violet;
      @include square(7);
    }
    &:hover {
      background: black;
    }
  }
}
```

![bP6rPj2AFW.gif](Chapter%2009%20%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC%205f738d3a025b4522a92bbf31f57d85f0/bP6rPj2AFW.gif)

### CSS module

styles.클래스명

자동으로 클래스명 안곂치게 해주므로 편하게 클래스명 설정가능

```jsx
import styles from './cssModule.module.css'
const CssModule = () => {
	return (
		<div className={styles.wrapper}>
			안녕하세요, 저는 <span className='something'>CSS Module!</span>
		</div>
	)
}

export default CssModule
```

```css
.wrapper {
  background: black;
  padding: 1rem;
  color: white;
  font-size: 2rem;
}

:global .something {
  font-weight: 800;
  color: aqua;
}
```

![whale_9rVcjInn1D.png](Chapter%2009%20%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC%205f738d3a025b4522a92bbf31f57d85f0/whale_9rVcjInn1D.png)

### classnames : 클래스명? 조합!

```css
import classNames from 'classnames';
classNames('one','two'); // 'one two'
```

사용

```jsx
const MyComponent = ({heightlighted,theme}) => (
	<div className = {classNames('MyComponent',{highlighted},theme}>Hello</div>
);
```

### Styled-components

``안에 css코드를 넣어js안에 스타일까지 한번에 처리

# 질문

CSS 클래스네임을 곂치지않게 하는 다양한 방법이 있네요! 어떤 방법을 가장 선호하시나요?

리액트에 스타일을 적용하는 방식 중 어떤 방법을 주로 사용하나요?

---

Styled component가 가장 인기있고, 저희도 이를 사용하고 있습니다. Styled component 쓰세요. 짱짱.

# 피드백

🤺