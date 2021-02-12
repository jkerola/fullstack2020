import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteCollection from './components/AnecdoteCollection'

const App = () => {
  return (
    <div>
      <AnecdoteCollection />
      <br />
      <AnecdoteForm />
    </div>
  )
}

export default App
