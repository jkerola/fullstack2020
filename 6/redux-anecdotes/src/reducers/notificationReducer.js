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

let timeoutID // keep track of displayed notifications timers
export const displayNotification = (content, time) => {
  // display content for 'time' MS and then clear
  return async dispatch => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    dispatch(setNotification(content))
    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, time)
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
