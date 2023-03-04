import axios from 'axios'
import { useState, useEffect } from 'react'

// component: takes values from input field and sets query state to the input value
const Filter = ({query, handleQuery}) => {
  return(
    <div>
      find countries <input type='search' query={query} onChange={handleQuery}/>
    </div>
  )
}

// component: filters the list of countries based on query value and returns the filtered list to the DOM
const Results = ({countries, query}) => {
  // filters country list
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
  // if the list is too long, then a message will be displayed instead of the full list
  if (filteredCountries.length > 10 || filteredCountries.length === 0) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  }
  // if if the list less than 10 countries(see above), but more than 1, each country will be listed
  if (filteredCountries.length > 1) {
    return (
        filteredCountries.map(country => <p key={country.cca3}>{country.name.common}</p>)
    )
  }
  // defines the only country listed for ease of reference in the following return
  const singleCountry = filteredCountries[0]
  // return details on single country
  return (
    <div key={singleCountry.cca3}>
      <h1>{singleCountry.name.common}</h1>
      <p>
      {singleCountry.capital}
      <br />
      {singleCountry.area}
      </p>
      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(singleCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={singleCountry.flags.png} alt= 'country flag' />
    </div>
  )
}

const App = () => {
  // states
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  // calls the list of countries from countries api
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // event handler for filter query
  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <Filter query={query} handleQuery={handleQuery}/>
      <Results countries={countries} query={query}/>
    </div>
  )
}

export default App;
