import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import BlogCollection from './components/BlogCollection'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LoginStatus from './components/LoginStatus'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [systemMessage, setSystemMessage] = useState({ style: 'success', message: null })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()
  const blogControls = {
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl,
    createNewBlog
  }
  const userControls = {
    user,
    userLogout
  }
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
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  function createNewBlog () {
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
  function clearBlogForm () {
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  function clearCredentials () {
    setUsername('')
    setPassword('')
  }
  function userLogout () {
    window.localStorage.removeItem('loggedBlogAppUser')
    setSystemMessage({ style: 'success', message: 'Logged out succesfully' })
    clearSystemMessage()
  }
  function clearSystemMessage () {
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
        {user !== null && BlogCollection(blogs)}
      </div>
    </div>
  )
}

export default App
