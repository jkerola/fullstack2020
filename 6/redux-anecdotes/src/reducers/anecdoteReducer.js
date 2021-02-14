import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes += 1
    const response = await anecdoteService.modifyItem(anecdote)
    dispatch({
      type: 'VOTE',
      content: response
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdoteObject = { content, votes: 0 }
    const response = await anecdoteService.createNew(anecdoteObject)
    dispatch({
      type: 'CREATE',
      content: response
    })
  }
}

export const initAnecdotes = (content) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      content: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const newState = state.map(anecdote =>
        anecdote.id === action.content.id ? action.content : anecdote)
      return newState
    } case 'CREATE': {
      return [...state, action.content]
    } case 'INIT': {
      return action.content
    } default: return state
  }
}

export default reducer
