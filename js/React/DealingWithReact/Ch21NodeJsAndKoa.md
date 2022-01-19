# Chapter 21: Node.js and Koa

Date: January 16, 2022

# 학습한 부분

Chapter 21: Node.js and Koa

# 예제 코드

next()로 미들웨어를 순차적으로 실행한다

```jsx
const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  console.log(ctx.url)
  console.log(1)
  next()
})
app.use((ctx, next) => {
  console.log(2)
  next()
})
app.use((ctx) => {
  ctx.body = 'hello world'
})

app.listen(4000, () => {
  console.log('Listening to port 4000')
})
```

다음과같이 조건을 주어 authorize를 구현가능하다

```jsx
app.use((ctx, next) => {
  console.log(ctx.url)
  console.log(1)
  if (ctx.query.authorized !== '1') {
    ctx.status = 401 // http://localhost:4000
    return
  }
  next()// http://localhost:4000/?authorized=1
})
```

next는 Promise를 반환한다. Promise를 사용해 처리가 끝나면 END출력하기.

```jsx
app.use((ctx, next) => {
  console.log(ctx.url)
  console.log(1)
  if (ctx.query.authorized !== '1') {
    ctx.status = 401 // hrjs
    return
  }
  next().then(() => {
    console.log('END')
  })
})
```

```jsx
/?authorized=1
1
2
END
```

같은 코드를 async/await 문법으로도 구현가능 

```jsx
app.use(async (ctx, next) => {
  console.log(ctx.url)
  console.log(1)
  if (ctx.query.authorized !== '1') {
    ctx.status = 401 // hrjs
    return
  }
  await next()
  console.log('END')
})
```

라우터 사용하기

```jsx
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()
//router 설정
router.get('/', (ctx) => {
  ctx.body = '홈'
})
router.get('/about', (ctx) => {
  ctx.body = '소개'
})
//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
  console.log('Listening to port 4000')
})
```

파라미터, 쿼리 사용

```jsx
	
router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params
  ctx.body = name ? `${name}의 소개` : '소개'
})
router.get('/posts', (ctx) => {
  const { id } = ctx.query
  ctx.body = id ? `포스트 #${id}` : `포스트 아이디가 없습니다.`
})

```

![whale_gqOASZoZsS.gif](Chapter%2021%20Node%20js%20and%20Koa%20957c443b9c0144858f5c7873b37451dc/whale_gqOASZoZsS.gif)

라우터 모듈화

```jsx
const api = require('./api')
router.use('/api', api.routes())
```

라우트 처리 함수만 모아놓은 파일을 컨트롤러라고 한다.

```jsx
let postId = 1

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
]

exports.list = (ctx) => {
  ctx.body = posts
}
exports.read = (ctx) => {
  const { id } = ctx.params
  const post = posts.find((p) => p.id.toString() === id)
  if (!post) {
    ctx.status = 404
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    }
    return
  }
  ctx.body = post
}
exports.write = (ctx) => {
  const { title, body } = ctx.request.body
  postId += 1
  const post = { id: postId, title, body }
  posts.push(post)
  ctx.body = post
}
exports.replace = (ctx) => {
  const { id } = ctx.params
  const index = posts.findIndex((p) => p.id.toString() === id)
  if (index === -1) {
    ctx.status = 404
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    }
    return
  }
  posts[index] = {
    id,
    ...ctx.request.body,
  }
  ctx.body = posts[index]
}

exports.update = (ctx) => {
  const { id } = ctx.params
  const index = posts.findIndex((p) => p.id.toString() === id)
  if (index === -1) {
    ctx.status = 404
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    }
    return
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  }
  ctx.body = posts[index]
}
exports.remove = (ctx) => {
  const { id } = ctx.params
  const index = posts.findIndex((p) => p.id.toString() === id)
  if (index === -1) {
    ctx.status = 404
    ctx.body = {
      message: '포스트가 존재하지않습니다.',
    }
    return
  }
  posts.splice(index, 1)
  ctx.status = 204
}
```

```jsx
posts.get('/', postsCtrl.list)
posts.post('/', postsCtrl.write)
posts.get('/:id', postsCtrl.read)
posts.delete('/:id', postsCtrl.remove)
posts.put('/:id', postsCtrl.replace)
posts.patch('/:id', postsCtrl.update)
```

postman을 사용해 테스트

![Postman_e170WYuU83.gif](Chapter%2021%20Node%20js%20and%20Koa%20957c443b9c0144858f5c7873b37451dc/Postman_e170WYuU83.gif)

# 질문

restapi에서 요청값에 따라 처리를 다르게 지정하는 작업을 했는데요

restapi는 결국 구문을 지정해두고 ex GET, PUT 사용자가 요청에따라 처리할 수 있게 해주는 역할인가요?

REST API가 아니라 Router에 대하여 말하는 것 같습니다.

**Router가 하는 일은 미리 URL 경로(`/users/:id` 등)와 메소드(`POST`, `GET`, `PUT` 등)를 정하고, 이들이 호출되었을때 어떤 코드가 호출되는지 지정합니다.**

REST는 상태에 의존하지 않는(즉, stateless한) API 호출방식 또는 설계방식 중 하나이니 나중에 따로 검색해서 공부해보세요!

포스트맨을 사용한 테스트가 잘 작동하다가

post 요청을 실수로 두 번 했더니

method not allowed 에러가 계속 뜨면서 서버도 작동이 안됩니다.( yarn start해도 NotFound 뜸)

이런건 어떻게 해결하나요?

보통 발생하지 않는 오류입니다.

아마 한번 URL과 메소드를 정확하게 입력했는지 확인하고, 그래도 문제가 해결되지 않는다면 깃허브 리포지토리 등으로 코드 전달해주면 한 번 확인해보겠습니다.

아래는 비슷한 에러가 발생한 사람이 작성한 글입니다. Koa를 사용할 떄 405를 만들 수 있는, 초심자가 할 수 있는 실수를 몇 개 적어두었습니다.

[https://github.com/ZijianHe/koa-router/issues/436](https://github.com/ZijianHe/koa-router/issues/436)

→ 해결하였습니다. write ctrl에서 잘못된 로직을 사용한 것이 원인이였어요. ( post의 파라미터값엔 없는 id 참조)