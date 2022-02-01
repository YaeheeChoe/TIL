# Chapter 22: mongoose

Date: January 24, 2022

# 학습한 부분

Chapter 22: mongoose

# 예제 코드

[TIL/js/React/DealingWithReact/blog/backend at main · YaeheeChoe/TIL](https://github.com/YaeheeChoe/TIL/tree/main/js/React/DealingWithReact/blog/backend)

### mongoose의 모델과 스키마

스키마 : 문서 내부의 각 필드의 타입을 정의한 객체

모델 : 스키마를 사용해 만드는 인스턴스

```jsx
import mongoose from 'mongoose'
const { Schema } = mongoose
// 몽구스 스키마 생성
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
})
// 몽구스 모델 생성
const Post = mongoose.model('Post', PostSchema)
export default Post
```

### 모델 사용, 컨트롤 구현(DB에 저장

```jsx
import Post from '../../models/post'//생성한 모델 import
import mongoose from 'mongoose'

export const read = async (ctx) => {
  const { id } = ctx.params
  try {
    const post = await Post.findById(id.trim()).exec()
		// Post 모델을 통해 DB접근, 사용
    ...
}
```

### Joi를 사용한 검증

```jsx
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  })// 스키마 생성
  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }// 검증, 구조가 맞지 않으면 400 에러 
  const { title, body, tags } = ctx.request.body
  const post = new Post({
    title,
    body,
    tags,
  })
  try {
    await post.save()
    ctx.body = post
  } catch (e) {
    ctx.throw(500, e)
  }
}
```

![MongoDBCompass_MwKtoBRK88.gif](Chapter%2022%20mongoose%201a34b95f48cd49e8a473e0669dd012e6/MongoDBCompass_MwKtoBRK88.gif)

페이지네이션 SKIP

# 질문

Q.  GET에서 다음과같은 오류가 나왔습니다.

casterror: cast to objectid failed for value "\n" (type string) at path "_id" for model

로그 찍어보니 ctx.params 값에 개행문자가 포함되어있었어요.(id 가 12인 경우 12\n이런식) 이런 경우가 일반적으로 자주 발생하는건가요? 이런 경우를 방지하기위해 주로 쓰는 방법이 있다면 알려주세요

**→ 해결!!**

다음과 같이 trim()으로 \n을 벗겨서 넣어주면 되네요

```jsx
await Post.findById(id.trim()).exec()
```

[Mongoose: CastError: Cast to ObjectId failed for value "[object Object]" at path "_id"](https://stackoverflow.com/questions/17223517/mongoose-casterror-cast-to-objectid-failed-for-value-object-object-at-path)

[Argument passed in must be a string of 24 hex characters - I think it is](https://stackoverflow.com/questions/30051236/argument-passed-in-must-be-a-string-of-24-hex-characters-i-think-it-is)

# 피드백

(이 부분은 가르쳐주는 사람이 예제코드와 배움의 진척을 보고 따로 작성함)