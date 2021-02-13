import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = (id) => {
    // dispatch new note, notification of vote and reset notification after 5 seconds
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${anecdote.content}`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired
}

export default Anecdote
