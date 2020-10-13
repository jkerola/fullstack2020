import React, { useState, useEffect } from 'react'
import axios from 'axios'

// from example at https://fullstackopen.com/osa2/lomakkeiden_kasittely#tehtavat-2-6-2-10
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const personsToShow = showAll // filter names that contain substring newFilter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  const handleNameChange = (event) => { //eventhandlers for textbox
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => { // -''-
    setNewNumber(event.target.value)
  }
  const addNewPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name.toLowerCase())
    const numbers = persons.map(person => person.number)
    if (names.includes(newName.toLowerCase()) || numbers.includes(newNumber)) {
      window.alert(`${names.includes(newName.toLowerCase()) //checks if name or number is in registry
        ? newName
        : newNumber} has already been added to the phonebook!`)
      setNewName('')
      setNewNumber('')
    } else { //creates a new person
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleFilterChange = (event) => { //if empty filterfield, show all contacts
    setNewFilter(event.target.value)
    if (event.target.value === ('')) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }
  // controls for adding a new person to the contact list
  const formControls = { addNewPerson, newName, handleNameChange, newNumber, handleNumberChange }
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <AddNewPersonForm formControls={formControls} />
      <h2>Numbers</h2>
      <Contacts personsToShow={personsToShow} />
    </div >
  )

}
const AddNewPersonForm = ({ formControls }) => {
  return (
    <form onSubmit={formControls.addNewPerson}>
      <legend><h3>Add a new contact</h3></legend>
      <div>
        name: <input value={formControls.newName} onChange={formControls.handleNameChange} /><br />
          number: <input value={formControls.newNumber} onChange={formControls.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const FilterForm = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter results with <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}
const Contacts = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

export default App