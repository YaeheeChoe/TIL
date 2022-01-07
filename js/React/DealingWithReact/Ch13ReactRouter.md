# Chapter 13: 리액트 라우터

Date: January 6, 2022

# 학습한 부분

Chapter 13: 리액트 라우터

## spa

[Single-page application - Wikipedia](https://en.wikipedia.org/wiki/Single-page_application)

단일 **페이지 애플리케이션**(SPA**)**은 웹 [브라우저](https://en.wikipedia.org/wiki/Web_browser)가 전체 새 페이지를 로드하는 기본 방식이 아닌 웹 [서버](https://en.wikipedia.org/wiki/Web_server)의 새로운 데이터로 현재 웹 [페이지](https://en.wikipedia.org/wiki/Web_design)를 동적으로 다시 작성함으로써 사용자와 상호 작용하는 웹 [애플리케이션](https://en.wikipedia.org/wiki/Web_application) 또는 웹 [사이트](https://en.wikipedia.org/wiki/Website)다. 목표는 웹사이트를 좀 더 [네이티브](https://en.wikipedia.org/wiki/Application_software) 앱처럼 [느끼게](https://en.wikipedia.org/wiki/User_experience) 만드는 빠른 전환이다.

[리액트 라우터 v6 튜토리얼](https://velog.io/@velopert/react-router-v6-tutorial)

# 예제 코드

[TIL/js/React/DealingWithReact/ch13router_tutorial at main · YaeheeChoe/TIL](https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/ch13router_tutorial)

### react route

다른 주소에 다른 화면을 보여주는 것을 라우팅이라고 한다.

Route 컴포넌트를 사용해 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여줄지 정의할 수 있다.

```jsx
import {Routes,Route} from 'react-router-dom'; 
import About from './About';
import Home from './Home';

function App() {
  return (
    <Routes>// routes안에 route element를 넣어줘야함
      <Route path ="/" element={<Home/>}></Route>
      <Route path ="/about" element={<About/>}></Route>
    </Routes>
  );
}
```

### Link 쓰셈

Link 컴포넌트는 페이지를 새로 불러오지않고 애플리케이션 유지상태에서

HTML5 History API를 사용해 페이지 주소만 변경해준다.

```jsx
<Link to="/about">소개  </Link>
```

### URL 파라미터와 쿼리

```jsx
//요론게 파라미터
/profile/velopert
//요론게 쿼리
/about?detais=true
```

React Router와 일부 라이브러리에서만 URL path를 파라미터라고 부르니 참고해주세요.

URL path를 파라미터라고 부르는 이유는 쿼리 파라미터(얘 이름도 파라미터입니다)와 구분하기 위해서입니다.

또한 `/abc/:userId/:memberId`와 같이 `:name`의 형식을 따르며 동적으로 바인딩할 수 있는 값에 한정해서 파라미터라고 부르는 것으로 알고있습니다. 일반 함수 파라미터같이요. 고정 URL path는 React Router에서도 파라미터라고 부르지 않습니다.

### 리액트 라우터에서 파라미터 사용

v6이후로 userParams()로 사용법이 바뀐 듯 하다.

```jsx
import { useParams } from 'react-router-dom';
const data = {
	devlog : {
		name: '최예희',
		description: '커여운 개발자',
	},
	gildong : {
		name: '홍길동',
		description: '개발자2',
	}
}
const Profile = () => {
	const username = useParams().username
	const profile =data[username]
	
	if (!profile){
		return <div>사용자 정보가 없습니다.</div>
	}
	return (
		<div>
			<h3>
				{username}({profile.name})
			</h3>
			<p>{profile.description}</p>
		</div>
	)
}
export default Profile
```

### 리액트 라우터에서 쿼리 사용

v6이후로 개정. useLocation()으로 location을 받아오면 된다.

```jsx
import QueryString from "qs"
import { useLocation } from "react-router-dom"
const About = () => {
	const location =useLocation()
	const query = QueryString.parse(location.search,{ignoreQueryPrefix:true})//?제거
	const showDetail = query.detail ==='true'//detail=true

	return (
		<div>
			<h1>소개</h1>
			<p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트입니다.</p>
			{showDetail && <p>detail is true</p>}
		</div>
	)
}

export default About
```

### 서브라우트

이거도 v6이후로 개정

```jsx
function App() {
  return (
    <>
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path ="/about" element={<About />}></Route>
        <Route path = "/profiles" element= {<Profiles/>}>
          <Route path=":username" element={<Profile />} 
						/*중첩라우트*//>
        </Route>
        
      </Routes>
      <p><Link to="/">홈</Link></p>
      <p><Link to="/about">소개  </Link></p>
      <p><Link to="/profiles">프로필  </Link></p>
    </>
  );
}
```

```jsx
function Profiles() {
	return (
		<div>
			<Outlet/>
			<h3>사용자 목록</h3>
			<p><Link to="/profiles/devlog">최예희 프로필</Link></p>
      <p><Link to="/profiles/gildong">홍길동 프로필</Link></p>
		</div>
	)
}
```

# 리뷰

라우팅은 v6이후로 많은 것이 바뀌었다.

교재에 있는 거보다 더 깔끔해서 마음에 든다.

# 피드백

😄