require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// GET ROUTES
blogRouter.get('/', async (request, response) => { // GET ALL ITEMS
  const blogs = await Blog.find({})
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
  const blog = new Blog(request.body)
  const returnedBlog = await blog.save()
  response.status(201).json(returnedBlog.toJSON())
})

// DELETE ROUTES
blogRouter.delete('/:id', async (request, response) => { // DELETE SINGLE ITEM
  const deletedNote = await Blog.findByIdAndRemove(request.params.id)
  console.log(deletedNote)
  if (deletedNote) { // 202 if found, else 204
    response.status(202).end()
  } else {
    response.status(204).end()
  }
})

module.exports = blogRouter
