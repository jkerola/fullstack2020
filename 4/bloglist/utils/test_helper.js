const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Emperor Penguins in Madagascar',
    author: 'Kubrick',
    url: 'istanpenguinz0.blogspot.com',
    likes: 0
  },
  {
    title: 'World Warrior Weekly',
    author: 'M.Bipson',
    url: 'clone-hunter.blogspot.com',
    likes: 1
  },
  {
    title: 'Paint Me, Austin',
    author: 'A. Powers',
    url: 'creedthoughts.gov/creedthoughts',
    likes: 201
  },
  {
    title: 'Birdwatching Siberia',
    author: 'Camarov bros.',
    url: 'russian-writers.blogspot.com',
    likes: 202
  }
]
const blogItem = {
  title: 'Test Blog Item',
  author: 'Janne Kerola',
  url: 'None',
  likes: 1
}
const blogWithNoLikes = {
  title: 'Blog Missing Likes',
  author: 'Janne Kerola',
  url: 'None'
}
const blogMissingAttributes = {
  likes: 1
}

// from example at
// https://fullstackopen.com/osa4/backendin_testaaminen#lisaa-testeja-ja-backendin-refaktorointia
const nonExistingId = async () => {
  const blogItem = new Blog(
    {
      content: 'willremovethissoon',
      author: 'nobody',
      likes: 0,
      url: 'google.com'
    })
  await blogItem.save()
  await blogItem.remove()

  return blogItem._id.toString()
}

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogItem,
  blogWithNoLikes,
  blogMissingAttributes,
  nonExistingId,
  getBlogs
}
