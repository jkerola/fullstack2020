const Blog = require('../models/blog')
const User = require('../models/user')
// GENERAL TESTING ASSISTS
const fakeId = '5f8d800f71d291e839736a7f'

// USER TESTING ASSISTS
const initialUsers = [
  {
    username: 'testuser',
    password: 'password'
  },
  {
    username: 'salimagick',
    name: 'Salim Malick',
    password: 'trianonlover'
  }
]
const userItem = {
  username: 'monopolyman',
  password: 'gotojail'
}
const userMissingPassword = {
  username: 'nopassword',
  name: 'tommy no-pass'
}
const userMissingName = {
  name: 'tommy no-name',
  password: 'forgetful'
}
const userShortName = {
  username: 'ed',
  name: 'eddie',
  password: 'culdesac'
}
const userShortPass = {
  username: 'HabaneroJim',
  name: 'Jimbo',
  password: 'a'
}
// BLOG TESTING ASSISTS
const initialBlogs = [
  {
    title: 'Emperor Penguins in Madagascar',
    url: 'istanpenguinz0.blogspot.com',
    author: 'National Geographic',
    likes: 0
  },
  {
    title: 'World Warrior Weekly',
    url: 'clone-hunter.blogspot.com',
    author: 'M. Bison',
    likes: 1
  },
  {
    title: 'Paint Me, Austin',
    url: 'creedthoughts.gov/creedthoughts',
    author: 'A. Powers',
    likes: 201
  },
  {
    title: 'Birdwatching Siberia',
    url: 'russian-writers.blogspot.com',
    author: 'Tolstoy',
    likes: 202
  }
]
const blogItem = {
  title: 'Test Blog Item',
  author: 'Test Author',
  url: 'None',
  likes: 1
}
const blogWithNoLikes = {
  title: 'Blog Missing Likes',
  author: 'Author missing likes',
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
const getUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
module.exports = {
  fakeId,
  // user testing variables
  initialUsers,
  userItem,
  userMissingName,
  userMissingPassword,
  userShortName,
  userShortPass,
  getUsers,
  // blog testing variables
  initialBlogs,
  blogItem,
  blogWithNoLikes,
  blogMissingAttributes,
  nonExistingId,
  getBlogs
}
