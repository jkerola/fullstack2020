require('express-async-errors')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// GET ROUTES
userRouter.get('/', async (request, response) => { // GET ALL USERS
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

// POST ROUTES
userRouter.post('/', async (request, response) => { // CREATE SINGLE USER
  const body = request.body
  if (!body.username || !body.password) {
    response.status(400).json({ error: 'username and password required' })
  }
  const pwdHash = await bcrypt.hash(body.password, 10) // hashing requires time, use await here
  const user = new User({
    username: body.username,
    name: body.name || undefined,
    pwdHash
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter
