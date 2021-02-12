import React from 'react'
import Anecdote from './Anecdote'
import { useSelector } from 'react-redux'

const AnecdoteCollection = () => {
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteCollection
