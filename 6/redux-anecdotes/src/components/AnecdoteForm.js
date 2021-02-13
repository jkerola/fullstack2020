import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = () => {
    event.preventDefault()
    // access input value with name
    const anecdote = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch(createAnecdote(anecdote))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <legend>Submit a new anecdote</legend>
        <div>
          <input name='anecdoteInput'></input>
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
