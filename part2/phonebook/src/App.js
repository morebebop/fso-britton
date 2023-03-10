// import states
import { useState, useEffect } from 'react'
// import components
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'
import personService from './services/persons'
// import styles
import './index.css'

const App = () => {
  // persons state hook holds the array for a persons name and number
  const [persons, setPersons] = useState([])
  // newName state hook sets the name for a person in the persons array
  const [newName, setNewName] = useState('')
  // newNumber state hook sets the number for a person in the persons array
  const [newNumber, setNewNumber] = useState([])
  // search state hook is defined with a value for what is searched for and a results array for the search results
  const [search, setSearch] = useState({
    search: '',
    results: []
  })
  // notification state and notificationType states are used to pass a message and message styling respectively to
  // the Notification component
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  // function to reset both the name and number fields
  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  // READ
  useEffect(() => {
    // gets the base url and sets the persons object to the response from the database
    personService
    .getAll()
    .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  // addName called on form submission
  const addName = (event) => {
    // prevents the form from refreshing the page after submission
    event.preventDefault()
    
    // assigns both the name and number to a sign person object
    const personObject = {
      name: newName,
      number: newNumber
    }

    // checks if name entered into field is already in phonebook object. DOES NOT check for
    // alternative capitalization. 'Harry Potter' !== 'harry potter' (true)
    if (persons.some(name => name.name === newName)) {
      // find the person object to update
      const nameDuplicate = persons.find(name => name.name === newName)
      // confirm that user would like to update person
      if (window.confirm(`${newName} is already added to the phonebook, replace the older number with a new one?`)) {
        
        // UPDATE
        return (
          personService
            .update(nameDuplicate.id, personObject)
            .then(response => {
              // updating the state to reflect the .update
              setPersons(persons.map(person => person.id !== nameDuplicate.id ? person : response.data))
              resetFields()
              setNotification(
                `Updated ${personObject.name}`
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
            .catch(error => {
              setNotification(
                `${personObject.name}'s information has already been removed from the server`
              )
              setNotificationType('error')
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
        )
      }
      return (
        resetFields()
      )
    }

    // CREATE
    // adds the new person object to the persons object
    return (
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          resetFields()
          setNotification(
            `Added ${personObject.name}`
          )
          setNotificationType('addedNotification')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
        })
    )
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
    return (
      setSearch ({
        search: event.target.value,
        list: results
      })
    )
  }

  // DELETE
  // deletes specific names on button click
  const removeName = (id) => {
    // handles deletion request
    const handleRemoveName = () => {
      // confirms deletion request
      if (window.confirm('Do you really want to delete this?')) {
        personService
        .remove(id)
        return(
          setPersons(persons.filter(person => person.id !== id))
        )
      }
    }

    return(
      <button onClick={handleRemoveName}>delete</button>
    )
  }
    
  return (
    <div>
    <h2>Phonebook</h2>
    <Notification message={notification} type={notificationType}/>
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
    <PersonsList persons={persons} search={search} removeName={removeName}/>
  </div>
  )
}

export default App