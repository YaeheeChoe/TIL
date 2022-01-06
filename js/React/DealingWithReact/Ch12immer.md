# Chapter 12: immer

Date: January 5, 2022

# 학습한 부분

Chapter 12: immer

# 예제 코드

다음은 유저의 닉네임과 이름을 입력받아 list에 저장하는 코드이다.

간단한 동작임에도 불변성 유지를 위해 신경써야 할 게 많다.

```jsx
function App() {
  const nextId = useRef(1)
  const [form,setForm] = useState({name:'',username:''})
  const [data,setData] = useState({
    array:[],
    uselessValue:null
  })

  const onChange= useCallback(
    e => {
      const {name,value} = e.target
      setForm({
        ...form,
        [name]:[value]
      })
    },[form]
  )
  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      const info = {
        id : nextId.current,
        name: form.name,
        username: form.username
      }
      setData({
        ...data,
        array: data.array.concat(info)
      })
      setForm({
        name:'',
        username: ''
      })
      nextId.current +=1
    }, [data,form.name,form.username]
  )
...
```

### immer

immer를 사용하면 이런 문제를 해결할 수 있다. “불변성에 신경 쓰지않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해 주는 것’이 이 라이브러리의 철학이다.

```jsx
import produce from 'immer'
const originalState= [
	{
		id :1,
		todo: '전개연산자 배열 내장함수로 불변성 유지',
		checked: true,
	},
	{
		id:2,
		todo:'immer로 불변성 유지',
		checked:false,
	}
]
//항목 찾기
const nextState =produce(originalState,draft =>{
	const todo = draft.find(t => t.id ===2)
	todo.checked =true
})
//데이터 추가
draft.push({
	id: 3,
	todo: '일정관리 앱에 todo 적용',
	checked : false,
})

//데이터 삭제
draft.splice(draft.findIndex(t => t.id ===1),1)
```

위와 같이 더욱 간결한 코드를 짤 수있다.

처음의 App.js 코드를 immer와 함수형 업데이트를 사용해 정리해보자

```jsx
function App() {
  const nextId = useRef(1)
  const [form,setForm] = useState({name:'',username:''})
  const [data,setData] = useState({
    array:[],
    uselessValue:null
  })

  const onChange= useCallback(
    e => {
      const {name,value} = e.target
      setForm(
        produce(draft=>{
          draft[name] = value
        })
      )
    },[])
  const onSubmit = useCallback(
    e => {
      e.preventDefault()
      const info = {
        id : nextId.current,
        name: form.name,
        username: form.username
      }
      setData(
        produce(draft=>{
          draft.array.push(info)
        })
      )
      setForm({
        name:'',
        username: ''
      })
      nextId.current +=1
    }, [form.name,form.username]
  )
  const onRemove = useCallback(
    id => {
      setData(
        produce(draft =>{
          draft.array.splice(draft.array.findIndex(info => info.id === id),1)
        })
      )
    },[]
  )
...
```

이전 App.js와 똑같이 잘 작동함을 볼 수 있다.

![whale_jxT96a7b6L.gif](Chapter%2012%20immer%20df26b41535c942fd875d71a6f0af7340/whale_jxT96a7b6L.gif)

# 리뷰

immer + 함수형 업데이트 하니까 넘 편하다.. 그래도 기본적인 상태값 변경법은 잘 숙지해두자.

# 피드백

🤗