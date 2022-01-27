import Joi from 'joi'
import User from '../../models/user'

export const register = async (ctx) => {
  //joi 검증
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  })
  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }
  const { username, password } = ctx.request.body
  // username 존재하느지 확인

  try {
    const exist = await User.findByUsername(username)
    if (exist) {
      ctx.status = 409
      return
    }
    const user = new User({
      username,
    })
    // user password설정
    await user.setPassword(password)
    // user.save
    await user.save()
    // 응답할 데이터에서 hashedPassword필드 제거
    ctx.body = user.serialize()
    const token = user.generateToken()
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    })
  } catch (e) {
    ctx.throw(500, e)
  }
}
export const login = async (ctx) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.status = 400
    return
  }
  try {
    const user = await User.findByUsername(username)
    if (!user) {
      ctx.status = 401
      return
    }
    const valid = await user.checkPassword(password)
    if (!valid) {
      ctx.status = 401
      return
    }
    ctx.body = user.serialize()
    const token = user.generateToken()
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    })
  } catch (e) {
    ctx.throw(500, e)
  }
}
export const check = async (ctx) => {}
export const logout = async (ctx) => {}
