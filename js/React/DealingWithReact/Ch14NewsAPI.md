# Chapter 14: API

Date: January 7, 2022

# 학습한 부분

Chapter 14: API

뉴스 api로 뉴스 불러오기 페이지 제작

# 예제 코드

[TIL/js/React/DealingWithReact/ch14new_api at main · YaeheeChoe/TIL](https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/ch14new_api)

### 콜백지옥

콜백을 여러번 순차적으로 처리하고싶다면 콜백함수 중첩해 구현가능

과하게 쓰면 콜백지옥ㅋㅋㅋ이 될 수있으니 주의

```jsx
function increase(number,callback){
	setTimeout(()=> {
		const result = number +10
		if (callback){
			callback(result)
		}
	},1000)
}
console.log('작업시작')
increase(0,result => {
	console.log(result)
	increase(result, result =>{
		console.log(result)
		increase(result, result =>{
			console.log(result)
			increase(result, result =>{
				console.log(result)
				console.log('작업 완료')
			})
		})
	})
})
```

### ES6 Promise - 콜백지옥 탈출하기

```jsx
function increase(number){
	const promise = new Promise((resolve,reject) =>{
		setTimeout(() =>{
			const result = number +10
			if(result >50){
				const e =new Error('NumberTooBig')
				return reject(e)
			}
			resolve(result)
		},1000)
	})
	return promise
}
// then 이후에 result
increase(0).then(number => {
	console.log(number)
	return increase(number)
}).then(number =>{
	console.log(number)
	return increase(number)
}).then(number =>{
	console.log(number)
	return increase(number)
}).catch(e =>{
	console.log(e)
})//reject catch
```

### ES8 async/await

ES6 부터 아닌가용?

```jsx
function increase(number){
	const promise = new Promise((resolve,reject) => {
		setTimeout(() =>{
			const result= number +10
			if (result > 50){
				const e = new Error('NumberTooBig')
				return reject(e)
			}
			resolve(result)
		},1000)
	})
	return promise
}

async function runTasks() {
	try {
		let result =await increase(0)
		console.log(result)
		result =await increase(result)
		console.log(result)
		result =await increase(result)
		console.log(result)
		result =await increase(result)
		console.log(result)
	} catch(e){
		console.log(e)
	}
}
runTasks()
```

## axios

```jsx
import React,{useState} from "react"
import axios from "axios"

const App = () => {
  const [data,setData] = useState(null)
  const onClick= () => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then(
			//axios.get : 주소에 get요청
			//.then으로 비동기적 확인
      response => {
        setData(response.data)
      }
    )
  }
  return (
    <>
      <>
        <button onClick={onClick}>불러오기</button>
      </>
      {data && <textarea rows={7} value={JSON.stringify(data,null,2)} readOnly={true}/>}
    </>
  )
}
export default App
```

async 적용버전 onClick

```jsx
const onClick= async () => {
    try{
      const responce= await axios.get('https://jsonplaceholder.typicode.com/posts/1')
      setData(responce.data)
    }
    catch(e){
      console.log(e)
    }
  }
```

axios는 물론 `axios.[method` 형태로 사용할수도 있지만, 어려 옵션을 넘길 때 용이하게 하기 위해서 아래의 포맷을 따르는 것을 추천합니다.

```jsx
const axiosResult = await axios({
	method: 'get',
	url: 'https://google.com',
	header: {Authorization: 'If you need credentials'},
	params: {aParam: 'If you need query parameters(not a body parameter)},
});
```

### 커스텀 hook으로 loading, resolved, error 관리

이 부분을 커스텀 hook으로 분리해 더 관리하기 편하게 만들었다.

```jsx
	import { useState, useEffect } from 'react'

export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false)
  const [resolved, setResolved] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const process = async () => {
      setLoading(true)
      try {
        const resolved = await promiseCreator();
        setResolved(resolved)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    };
    process()
  }, deps)

  return [loading, resolved, error]
}
```

### api 로 news 데이터 받아오기

받아온 데이터를 리스트 컴포넌트에 넘겨 뉴스를 보여준다

```jsx
const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
    );
  }, [category]);

  if (loading) {
    return <NewsListBlock>대기중...</NewsListBlock>;
  }
  if (!response) {
    return null;
  }

  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }

  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
```

방금 말한대로 `axios({})` 형태로 호출하세요. 언제나 정신건강에 좋습니다.

```jsx
  const [loading, response, error] = usePromise(() => {			 
		const categoryWhichAxiosRealize = category !== 'all' ? category : undefined;

		return axios({
			method: 'get',
			url: `https://newsapi.org/v2/top-headlines`,
			params: {
				country: 'kr',
				category: categoryWhichAxiosRealize,
				apiKey: '0a8c4202385d4ec1bb93b7e277b3c51f',
			},
		});
  }, [category]);
```

### styled-component css 넘겨주기 예시

```jsx
${props =>
		props.active && css`
			font-weight: 600;
			border-bottom: 2px solid #22b8cf;
			color: #22b8cf;
			&:hover {
				color: #3bc9db;
			}
		`
...
```

# 질문

429에러는 보통 어느 상황에서 나타나나요?

너무 많은 리퀘스트를 조지셨나보군요. Too Many Requests 에러입니당.

[429 Too Many Requests - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429)

# 피드백

😇