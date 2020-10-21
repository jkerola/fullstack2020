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
describe('object', () => {
  test('contains field "id"', async () => {
    const response = await api.get('/api/blogs')
    const content = response.body
    expect(content[0].id).toBeDefined() // test id exists
    expect(content[0]._id).not.toBeDefined() // test _id does not
  })
})
describe('post', () => {
  test('create new blog item', async () => {
    const newBlog = helper.blogItem
    await api
      .post('/api/blogs')
      .send(newBlog) // sends a javascript object, not raw JSON
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const content = response.body.map(blogs => blogs.title) // from the example above
    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(content).toContain(newBlog.title) // check list of titles contains new blog title
  })
  test('without "likes" attribute, defaults to 0', async () => {
    const newBlog = helper.blogWithNoLikes // object has no attribute at all
    let response = await api
      .post('/api/blogs')
      .send(newBlog)
    expect(response.body.likes).toBe(0)
    const secondBlog = { ...newBlog, likes: undefined } // attribute exists, but undefined
    response = await api
      .post('/api/blogs')
      .send(secondBlog)
    expect(response.body.likes).toBe(0)
  })
  test('missing required attributes returns 400', async () => {
    const newBlog = helper.blogMissingAttributes // missing both title, url
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const titledBlog = { ...newBlog, title: 'test title' } // missing url
    await api
      .post('/api/blogs')
      .send(titledBlog)
      .expect(400)
    const urledBlog = { ...newBlog, url: 'test url' } // missing title
    await api
      .post('/api/blogs')
      .send(urledBlog)
      .expect(400)
  })
})
describe('single', () => {
  test('view single item', async () => {
    const response = await api.get('/api/blogs')
    const blogId = response.body[0].id
    await api.get(`/api/blogs/${blogId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('delete single item', async () => {
    const response = await api.get('/api/blogs')
    const blogId = response.body[0].id
    await api.delete(`/api/blogs/${blogId}`)
      .expect(202)
    const updatedResponse = await api.get('/api/blogs')
    const ids = updatedResponse.body.map(blog => blog.id)
    expect(ids).not.toContain(blogId) // deleted id should not be in the updated list
    expect(updatedResponse.body.length).toBe(response.body.length - 1)
  })
  test('view nonexisting item returns 404', async () => {
    await api.get(`/api/blogs/${helper.fakeId}`)
      .expect(404)
  })
  test('delete nonexisting item returns 204', async () => {
    await api.delete(`/api/blogs/${helper.fakeId}`)
      .expect(204)
  })
})
describe('update', () => {
  test('update single item', async () => {
    const newBlog = helper.blogItem
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    await api.put(`/api/blogs/${ids[0]}`)
      .send(newBlog)
      .expect(200)
    const updatedBlogs = await api.get('/api/blogs')
    const titles = updatedBlogs.body.map(blog => blog.title)
    expect(titles).toContain(newBlog.title)
  })
  test('update missing item returns 404', async () => {
    const newBlog = helper.blogItem
    await api.put(`/api/blogs/${helper.fakeId}`)
      .send(newBlog)
      .expect(404)
  })
  test('update with missing attributes returns 400', async () => {
    const newBlog = helper.blogMissingAttributes
    const response = await api.get('/api/blogs')
    const ids = response.body.map(blog => blog.id)
    await api.put(`/api/blogs/${ids[0]}`)
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
