import React, { useState } from 'react'

// from example at https://fullstackopen.com/osa2/lomakkeiden_kasittely#tehtavat-2-6-2-10
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Teemu Pukki' }
  ])
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const addNewPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if(names.includes(newName)) {
      window.alert(`${newName} has already been added to the phonebook!`)
    } else {
      const newPerson = {
        name: newName,
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )

}

export default App