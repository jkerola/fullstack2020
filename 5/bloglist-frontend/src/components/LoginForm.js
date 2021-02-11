import React from 'react'
import loginService from '../services/login'

const LoginForm = (controls) => {
  const attemptLogin = async () => {
    event.preventDefault()
    const userInfo = {
      username: controls.username,
      password: controls.password
    }
    try {
      const user = await loginService.loginUser(userInfo)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      controls.setUser(user)
      controls.setSystemMessage({ style: 'success', message: 'Login succesful' })
    } catch (exception) {
      let message = 'Invalid Credentials'
      if (exception.message.endsWith('400')) {
        message = 'Missing Credentials'
      }
      controls.setSystemMessage({ style: 'error', message })
    }
    controls.clearSystemMessage()
    controls.clearCredentials()
  }
  return (
    <form onSubmit={attemptLogin}>
      <div>
        Username <input
          id='usernameInput'
          type='text'
          name='Username'
          value={controls.username}
          onChange={({ target }) => controls.setUsername(target.value)}
        />
      </div>
      <div>
        Password <input
          id='passwordInput'
          type='password'
          name='Password'
          value={controls.password}
          onChange={({ target }) => controls.setPassword(target.value)}
        />
      </div>
      <button id='loginButton' type='submit'>login</button>
    </form>
  )
}

export default LoginForm
