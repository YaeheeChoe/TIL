const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const api = require('./api')

const app = new Koa()
const router = new Router()
//라우트 모듈화
router.use('/api', api.routes())
//라우트 적용 전 바디파서 적용
app.use(bodyParser())
//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
  console.log('Listening to port 4000')
})
