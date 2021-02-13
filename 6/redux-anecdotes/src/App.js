import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteCollection from './components/AnecdoteCollection'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h2>Anecodtes</h2>
      <Filter />
      <Notification />
      <AnecdoteCollection />
      <br />
      <AnecdoteForm />
    </div>
  )
}

export default App
