export const setFilter = (content) => {
  return {
    type: 'FILTER',
    content: content
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER': {
      return action.content
    } default: return state
  }
}

export default reducer
