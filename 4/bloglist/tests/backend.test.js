const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')

const api = supertest(app)

// from example at
// https://fullstackopen.com/osa4/backendin_testaaminen#testin-before-each-metodin-optimointi
const Blog = require('../models/blog')
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog)) // list of BLOG OBJECTS
  const promiseArray = blogObjects.map(blog => blog.save()) // list of PROMISES
  await Promise.all(promiseArray) // tries to execute callbacks simultaneously, returns list of responses
})

describe('general', () => {
  test('response is JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('correct amount of items', async () => {
    const response = await api.get('/api/blogs')
    const content = response.body
    expect(content.length).toBe(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
