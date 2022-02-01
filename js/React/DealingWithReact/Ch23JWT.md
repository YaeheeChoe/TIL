# Chapter 23: JWT

Date: January 27, 2022

# 학습한 부분

Chapter 23: JWT

# 예제 코드

jwt 엑세스 토큰을 사용해 user정보에 접근하기위해 다음과 같이 미들웨어를 구현해주었다.

```jsx
const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token')
  if (!token) {
    return next()
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    }
    const now = Math.floor(Date.now() / 1000)
    //토큰 유효기간 3일 미만이면 재발급
    if (decoded.exp - now < 60 * 60 * 24 * 3) {
      const user = await User.findById(decoded._id)
      const token = user.generateToken()
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      console.log('토큰 재발급')
    }
    return next()
  } catch (e) {
    return next()
  }
}
```

![Code_9xG8fhL4Rk.gif](Chapter%2023%20JWT%2067ebdc3ef64a4be1afb75a5a51e8c831/Code_9xG8fhL4Rk.gif)

![Postman_y7uBAnw7wn.gif](Chapter%2023%20JWT%2067ebdc3ef64a4be1afb75a5a51e8c831/Postman_y7uBAnw7wn.gif)

보안기능을 구현했으니 사용해보자

로그인 해야만 새 포스트를 작성할 수 있는 기능, 삭제와 수정은 작성자만 할 수 있게 구현해보았다

다음 간단한 미들웨어로 로그인을 확인할 수 있다.

```jsx
const checkLoggedIn = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401
    return
  }
  return next()
}
export default checkLoggedIn
```

다음 미들웨어로 코드를 간소화하자

```jsx
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    ctx.status = 400
    return
  }
  try {
    const post = await Post.findById(id)
    if (!post) {
      ctx.status = 404
      return
    }
    ctx.state.post = post
    return next()
  } catch (e) {
    ctx.throw(500, e)
  }
  return next()
}
```

라우터도 다음과 같이 리팩토링 해주었다

```jsx
const posts = new Router()
posts.get('/', postsCtrl.list)
posts.post('/', checkLoggedIn, postsCtrl.write)

const post = new Router() //:id
post.get('/', postsCtrl.read)
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove)
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update)

posts.use('/:id', postsCtrl.getPostById, post.routes())

export default posts
```

회원인증 시스템 도입 완료!

![Code_hGe2HSr8b5.gif](Chapter%2023%20JWT%2067ebdc3ef64a4be1afb75a5a51e8c831/Code_hGe2HSr8b5.gif)

post.ctrl의 list에 쿼리를 사용해 지정한 유저네임 혹은 태그의 게시물을 보여주는 기능을 추가했다

```jsx
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10)
  if (page < 1) {
    ctx.status = 400
    return
  }
  const { tag, username } = ctx.query
  //유효한 값만 넣도록 처리
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  }
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec()
    const postCount = await Post.countDocuments(query).exec()
    ctx.set('Last-Page', Math.ceil(postCount / 10))
    ctx.body = posts.map((post) => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }))
  } catch (e) {
    ctx.throw(500, e)
  }
}
```

![YES24eBook_yP9tjoXH7d.gif](Chapter%2023%20JWT%2067ebdc3ef64a4be1afb75a5a51e8c831/YES24eBook_yP9tjoXH7d.gif)

# 질문

이전부터 ctrl 함수의 인자로 넘어온 ctx를 통해 cookie등에 엑세스하고있는데요, 이 ctx가 정확히 무엇을 가리키고있는 것인가요? 

→찾아본 결과 ctx는 Context의 줄임말로 웹 요청과 응답에 관한 정보를 지니고 있다. 라고 합니다. 요게 맞나요? 좋은 자료 있으면 추천 부탁드려요

# 실수 기록

### TypeError: next is not a function

TypeError: next is not a function
at jwtMiddleware (C:\Users\YehuiChoe\Desktop\TIL\js\React\DealingWithReact\blog\backend\src\lib\jwtMiddleware.js:4:10)
at Object.<anonymous> (C:\Users\YehuiChoe\Desktop\TIL\js\React\DealingWithReact\blog\backend\src\main.js:26:9)
at Generator.next (<anonymous>)

Node.js v17.4.0
error Command failed with exit code 1.

Q. cookies 가업다고,,?희원이에게 물어보자

A. jwt객체를 사용하시오

본 책의 예제코드를 다운받아 main.js를 비교해본 결과,...

괄호를 안붙이고 넣었어야했어

```jsx
// 내가 쓴 코드
app.use(jwtMiddleware())
// 올바른 코드
app.use(jwtMiddleware)
```

app.use에 jwtMiddleware()를 넣어주면 에러가 뜨는 이유는 무엇인가요?

객체와 인스턴스의 차이에 의해서 발생하는 에러였던 건가요?

### 앗!

jwtmiddleware에서 ctx.status(...)에 user정보 기록해놓고

ctrl에서 state에서 user접근하려고 하는 어처구니없는 실수를 저질렀다

# 피드백

(이 부분은 가르쳐주는 사람이 예제코드와 배움의 진척을 보고 따로 작성함)