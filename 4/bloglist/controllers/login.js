const loginRouter = require('express').Router()
const helper = require('../utils/user_helper')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'missing username or password' })
  }
  const user = await User.findOne({ username: body.username })
  const passwordCheck = user === null
    ? false
    : await helper.comparePass(body.password, user.pwdHash)
  if (!(user && passwordCheck)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }
  const tokenUser = {
    username: user.username,
    id: user.id
  }
  const token = jwt.sign(tokenUser, process.env.SECRET)
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})
module.exports = loginRouter
