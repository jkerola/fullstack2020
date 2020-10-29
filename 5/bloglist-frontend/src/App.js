import './App.css'
import React, { useState, useEffect } from 'react'
import BlogCollection from './components/BlogCollection'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import LoginStatus from './components/LoginStatus'

const App = () => {
  const [systemMessage, setSystemMessage] = useState({ style: 'success', message: null })
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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
    clearSystemMessage
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
        {
          systemMessage.message === null
            ? null
            : <p className={systemMessage.style}>{systemMessage.message}</p>
        }
      </div>
      <div>
        {user === null && LoginForm(loginControls)}
      </div>
      <br />
      <div>
        {user !== null && LoginStatus(userControls)}
        {user !== null && BlogCollection(blogs)}
      </div>
    </div>
  )
}

export default App
