import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import BlogCollection from './components/BlogCollection'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LoginStatus from './components/LoginStatus'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  // hooks
  const [systemMessage, setSystemMessage] = useState({ style: 'success', message: null })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()
  // collections of hooks to ease passing props
  // creating new blog posts
  const blogControls = {
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
    createNewBlog
  }
  // modifying single blog posts
  const blogItemControls = {
    blogs,
    likeBlogItem,
    deleteBlogItem,
    user
  }
  // user related controls
  const userControls = {
    user,
    userLogout
  }
  // login functionality controls
  const loginControls = {
    username,
    setUsername,
    password,
    setPassword,
    user,
    setUser,
    setSystemMessage,
    clearSystemMessage,
    clearCredentials
  }
  // useEffect hooks
  // check if user has already logged in
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])
  // fetch blogs from database
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  // functions
  function createNewBlog () {
    // called by BlogForm component, creates a blogItem object
    // and posts it to backend for creation
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blog = {
      title,
      author,
      url
    }
    blogService.createBlog(user.token, blog)
      .then(() => {
        setSystemMessage({ style: 'success', message: 'Blog succesfully added' })
        blogService.getAll().then(blogs => setBlogs(blogs))
        clearBlogForm()
      })
      .catch(() => {
        setSystemMessage({ style: 'error', message: 'Missing required fields' })
      })
    clearSystemMessage()
  }
  function likeBlogItem (blogItem) {
    // called by button in detailed view, sends a put request to
    // backend, increasing likes value of the blogItem by 1
    event.preventDefault()
    console.log(blogItem)
    const modBlogItem = blogItem
    modBlogItem.user = modBlogItem.user.id
    modBlogItem.likes = blogItem.likes + 1
    blogService.likeBlog(user.token, modBlogItem)
      .then(() => {
        setSystemMessage({ style: 'success', message: 'Blog successfully liked' })
        blogService.getAll().then(blogs => setBlogs(blogs))
      })
      .catch(() => {
        setSystemMessage({ style: 'error', message: 'Error submitting like...' })
      })
    clearSystemMessage()
  }
  function deleteBlogItem (blogItem) {
    // called by button in detailed view, sends a delete request to backend,
    // removing the blogItem from database
    event.preventDefault()
    if (window.confirm(`Are you sure you wish to delete blog item: ${blogItem.title}?`)) {
      blogService.deleteBlog(user.token, blogItem)
        .then(() => {
          setSystemMessage({ style: 'success', message: 'Blog deleted succesfully' })
          blogService.getAll().then(blogs => setBlogs(blogs))
        })
        .catch(() => {
          setSystemMessage({ style: 'error', message: 'Error deleting blog...' })
        })
      clearSystemMessage()
    }
  }
  function clearBlogForm () {
    // helper function, clears BlogForm component input fields
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  function clearCredentials () {
    // helper function, clears LoginForm component input fields
    setUsername('')
    setPassword('')
  }
  function userLogout () {
    // helper function, removes userdata from browser memory
    window.localStorage.removeItem('loggedBlogAppUser')
    setSystemMessage({ style: 'success', message: 'Logged out succesfully' })
    clearSystemMessage()
  }
  function clearSystemMessage () {
    // helper function, clears notification popup (login success, fail etc) after
    // four seconds have passed
    setTimeout(() => {
      const styleObject = { style: 'error', message: null }
      setSystemMessage(styleObject)
    }, 4000)
  }
  return (
    <div>
      <h2>Bloglist</h2>
      <div>
        {systemMessage.message === null
          ? null
          : <p className={systemMessage.style}>{systemMessage.message}</p>
        }
      </div>
      <div>
        {user === null && LoginForm(loginControls)}
        {user !== null && LoginStatus(userControls)}
        {user !== null && <Togglable ref={blogFormRef} buttonLabel='new blog'>{BlogForm(blogControls)}</Togglable>}
        <br />
        {user !== null && BlogCollection(blogItemControls)}
      </div>
    </div>
  )
}

export default App
