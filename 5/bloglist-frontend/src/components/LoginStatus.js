import React from 'react'

const LoginStatus = (controls) => {
  return (
    <div>
      <p>
        Logged in as {controls.user.name} <button onClick={controls.userLogout}>Logout</button>
      </p>
    </div>
  )
}

export default LoginStatus
