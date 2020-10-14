import React, { useState, useEffect } from 'react'
import ContactService from './services/Contacts'

// from example at https://fullstackopen.com/osa2/lomakkeiden_kasittely#tehtavat-2-6-2-10
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  useEffect(() => {
    ContactService.getContacts()
      .then(contacts => {
        setPersons(contacts)
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
      ContactService.createContact(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        }).catch(error => {
          console.log(error)
        })
      setNewName('')
      setNewNumber('')
    }
  }
  const removePerson = (removedPerson) => {
    const message = `Delete ${removedPerson.name}?`
    if (window.confirm(message)) {
      ContactService.removeContact(removedPerson.id)
        .catch(error => {
          console.log(error)
        })
      setPersons(persons.filter(person => person.id !== removedPerson.id))
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
      <Contacts personsToShow={personsToShow} removePerson={removePerson} />
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
const Contacts = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} removePerson={removePerson} />
      )}
    </div>
  )
}

const Person = ({ person, removePerson }) => {
  return (
    <p>
      {person.name} {person.number} <button onClick={() => removePerson(person)}>
        remove
      </button>
    </p>
  )
}

export default App