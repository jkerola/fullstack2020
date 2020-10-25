require('express-async-errors')
const blogRouter = require('express').Router()
const helper = require('../utils/user_helper')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// GET ROUTES
blogRouter.get('/', async (request, response) => { // GET ALL ITEMS
  const blogs = await Blog
    .find({})
    .populate('author', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response) => { // GET SINGLE ITEM
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

// POST ROUTES
blogRouter.post('/', async (request, response) => { // POST NEW ITEM
  const token = helper.getAuthorizationToken(request)
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // jwt requires specific error handling to function properly
  const decodedToken = jwt.verify(token, process.env.SECRET, function (error, decoded) {
    if (error) {
      return response.status(400).json({ error: error.message })
    } else {
      return decoded
    }
  })
  const blog = new Blog(request.body)
  const user = await User.findById(decodedToken.id)
  if (!blog.author) {
    blog.author = user.id
  }
  const returnedBlog = await blog.save()
  user.blogs = user.blogs.concat(returnedBlog.id)
  await user.save()
  response.status(201).json(returnedBlog.toJSON())
})

// DELETE ROUTES
blogRouter.delete('/:id', async (request, response) => { // DELETE SINGLE ITEM
  const deletedNote = await Blog.findByIdAndRemove(request.params.id)
  if (deletedNote) { // 202 if found, else 204
    response.status(202).end()
  } else {
    response.status(204).end()
  }
})

// PUT ROUTES
blogRouter.put('/:id', async (request, response) => { // UPDATE SINGLE ITEM
  const body = request.body
  const newBlog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  const oldBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      newBlog,
      {
        new: true,
        setDefaultsOnInsert: true, // use schema defaults
        runValidators: true // run updated item against validators
      })
  if (oldBlog) {
    response.status(200).json(oldBlog.toJSON())
  } if (!oldBlog) {
    response.status(404).end()
  } else {
    response.status(400).end()
  }
})

module.exports = blogRouter
