import React from 'react'
import Anecdote from './Anecdote'
import { useSelector } from 'react-redux'

const AnecdoteCollection = () => {
  const anecdotes = useSelector(state => {
    // if no filter, display all
    if (state.filter === '') {
      return state.anecdotes
    }
    // filter content if it includes filter substring
    const filteredAnecdotes = state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    return filteredAnecdotes
  })
  // sort anecdotes based on votes
  const sortedAnecdotes = anecdotes.sort((a, b) => {
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

export default AnecdoteCollection
