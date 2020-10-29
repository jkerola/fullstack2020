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
      controls.setUser(user)
      controls.setUsername('')
      controls.setPassword('')
      controls.setSystemMessage({ style: 'success', message: 'Login succesful' })
      controls.clearSystemMessage()
    } catch (exception) {
      controls.setSystemMessage({ style: 'error', message: 'Invalid credentials' })
      controls.clearSystemMessage()
    }
  }
  return (
    <form onSubmit={attemptLogin}>
      <div>
        Username <input
          type='text'
          name='Username'
          value={controls.username}
          onChange={({ target }) => controls.setUsername(target.value)}
        />
      </div>
      <div>
        Password <input
          type='password'
          name='Password'
          value={controls.password}
          onChange={({ target }) => controls.setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm
