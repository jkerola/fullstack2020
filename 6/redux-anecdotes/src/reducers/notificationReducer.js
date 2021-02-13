export const setNotification = (message) => {
  return {
    type: 'NOTIFICATION',
    msg: message
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET'
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFICATION': {
      return action.msg
    } case 'RESET': {
      return null
    } default: return state
  }
}

export default reducer
