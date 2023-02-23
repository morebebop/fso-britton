import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'

const App = () => {
  // persons state hook holds the array for a persons name and number
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // newName state hook sets the name for a person in the persons array
  const [newName, setNewName] = useState('')
  // newNumber state hook sets the number for a person in the persons array
  const [newNumber, setNewNumber] = useState([])
  // search state hook is defined with a value for what is searched for and a results array for the search results
  const [search, setSearch] = useState({
    search: '',
    results: []
  })
  
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

    // event handler for the search field. 
    const handleSearchChange = (event) => {
      // updates the search field to whatever has been typed.
      setSearch({search: event.target.value})
      // results is assigned the value of the persons array filtered for any person that contains values in the search field.
      // this searches only for the name field and not the number field.
      const results = persons.filter(person => {
        // checks for a value for of the search and returns the persons array if search input is empty.
        if (event.target.value === "") {
          return (
            person
          )
        }
        return (
          person.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      })
      setSearch ({
        search: event.target.value,
        list: results
      })
    }
    
    return (
      <div>
      <h2>Phonebook</h2>
      {/* filter shown with <input value={search.search} onChange={handleSearchChange} type='search'/> */}
      <Filter 
        search={search} 
        handleSearchChange={handleSearchChange}
      />
      <h2>add a New</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Person persons={persons} search={search}/>
    </div>
  )
}

export default App