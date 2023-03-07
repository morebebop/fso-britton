//stopped working on this at 2.19. Rand into bug that occurs when clicking show button. country shown displays correctly, but the input field stops updating the results

import { useState, useEffect } from 'react'

// components
import Filter from './components/Filter'
import Results from './components/Results'
import countriesService from './services/countries'

const App = () => {
  // states
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  // calls the list of countries from countries api
  useEffect(() => {
    countriesService.getAll().then(response => setCountries(response.data))
  }, [])

  // event handler for filter query
  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <Filter query={query} handleQuery={handleQuery}/>
      <Results countries={countries} query={query} setCountries={setCountries}/>
    </div>
  )
}

export default App;
