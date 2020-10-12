import React, { useState } from 'react'

// from example at https://fullstackopen.com/osa2/lomakkeiden_kasittely#tehtavat-2-6-2-10
const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040 123 4567'
    },
    {
      name: 'Teemu Pukki',
      number: '08 122 999'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addNewPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const numbers = persons.map(person => person.number)
    if (names.includes(newName) || numbers.includes(newNumber)) {
      window.alert(`${names.includes(newName)
        ? newName
        : newNumber} has already been added to the phonebook!`)
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value === ('')) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        filter results with <input value={newFilter} onChange={handleFilterChange} />
      <form onSubmit={addNewPerson}>
        <legend><h3>Add a new contact</h3></legend>
        <div>
          name: <input value={newName} onChange={handleNameChange} /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div>
    </div>
  )

}

export default App