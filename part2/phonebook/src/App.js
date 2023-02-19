import { useState } from 'react'

const App = () => {
  // calling two state consts. persons will handle the list of people in the phone book]
  // name will handle the names entered in the phonebook
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  // addName called on form submission
  const addName = (event) => {
    // prevents the form from refreshing the page after submission
    event.preventDefault()
    // call setPersons to create a new array with a copy of the old persons array and the newName
    // entered in the phonebook as the last object in the array.
    setPersons(
      [
        ...persons,
        {key: newName, name: newName}
      ]
    )
    // returns the input field to empty after form submission
    setNewName('')
  }

  // sets the newName to whatever is entered in the input field
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {/* takes the persons array and displays it as a p on page */}
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App