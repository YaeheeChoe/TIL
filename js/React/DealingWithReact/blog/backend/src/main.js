require('dotenv').config()
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'

import api from './api'
import jwtMiddleware from './lib/jwtMiddleware'

const { PORT, MONGO_URI } = process.env
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('CONNECTED MONGODB')
  })
  .catch((e) => {
    console.error(e)
  })

const app = new Koa()
const router = new Router()
//라우트 모듈화
router.use('/api', api.routes())
//라우트 적용 전 바디파서 적용
app.use(bodyParser())
app.use(jwtMiddleware)
//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

const port = PORT || 4000
app.listen(port, () => {
  console.log('Listening to port %d', port)
})
