import React from 'react'
import Anecdote from './Anecdote'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AnecdoteCollection = (props) => {
  // sort anecdotes based on votes
  const sortedAnecdotes = props.anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  // if no filter, display all
  if (state.filter === '') {
    return { anecdotes: state.anecdotes }
  }
  // filter content if it includes filter substring
  const filteredAnecdotes = state.anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  return { anecdotes: filteredAnecdotes }
}

AnecdoteCollection.propTypes = {
  anecdotes: PropTypes.array.isRequired
}

const ConnectedAnecdoteCollection = connect(mapStateToProps)(AnecdoteCollection)
export default ConnectedAnecdoteCollection
