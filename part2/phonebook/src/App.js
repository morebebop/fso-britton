import { useState } from 'react'

const App = () => {
  // calling three state consts. persons will handle the list of people in the phone book]
  // name will handle the names entered in the phonebook. number handles phone numbers
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState([])

  // addName called on form submission
  const addName = (event) => {
    // prevents the form from refreshing the page after submission
    event.preventDefault()

    // checks if name entered into field is already in phonebook object. DOES NOT check for
    // alternative capitalization. 'Harry Potter' !== 'harry potter' (true)
    if (persons.some(name => name.name === newName)) {
      setNewName('')
      setNewNumber('')
      return (
        alert(`${newName} is already added to phonebook`)
      )
    }
    // call setPersons to create a new array with a copy of the old persons array and the name/number
    // entered in the phonebook as the last object in the array.
    setPersons(
      [
        ...persons,
        {key: newName, name: newName, number: newNumber}
      ]
    )
    // returns the input fields to empty after form submission
    setNewName('')
    setNewNumber('')
  }

 // event handler for name field. updates newName to whatever has been typed
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // event handler for number field. updates newNumber to whatever has been typed
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input value={newName} onChange={handleNameChange} />
          <br />
          number: 
          <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {/* takes the persons array and displays it as a p on page */}
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App