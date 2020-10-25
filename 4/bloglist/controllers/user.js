require('express-async-errors')
const userRouter = require('express').Router()
const helper = require('../utils/user_helper')
const User = require('../models/user')

// GET ROUTES
userRouter.get('/', async (request, response) => { // GET ALL USERS
  const users = await User
    .find({})
    .populate('blogs')
  response.json(users.map(user => user.toJSON()))
})

// POST ROUTES
userRouter.post('/', async (request, response) => { // CREATE SINGLE USER
  const body = request.body
  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'username and password required' })
  }
  if (body.password.length <= 2) {
    return response.status(400).json({ error: 'password requires minimum length of 3 characters' })
  }
  const pwdHash = await helper.hashPass(body.password)
  const user = new User({
    username: body.username,
    name: body.name || undefined,
    pwdHash
  })
  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = userRouter
