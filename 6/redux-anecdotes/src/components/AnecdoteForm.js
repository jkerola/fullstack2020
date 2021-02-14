import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AnecdoteForm = (props) => {
  const handleSubmit = async () => {
    event.preventDefault()
    // access input value with name
    const anecdote = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    props.createAnecdote(anecdote)
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

AnecdoteForm.propTypes = {
  createAnecdote: PropTypes.func.isRequired
}

const ConnectedAnecdoteForm = connect(null, { createAnecdote })(AnecdoteForm)
export default ConnectedAnecdoteForm
