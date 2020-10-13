import Axios from 'axios'
import React, { useEffect, useState } from 'react'

//using https://restcountries.eu/ for information
const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(newFilter))
  return (
    <div>
      <h3>RestCountries</h3>
      <FilterField handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <CountryList filteredCountries={filteredCountries} />
    </div>
  )
}
const CountryList = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return(
      <div>
        <h4>{country.name}</h4>
        <br/>Capital city: {country.capital}
        <br/>Population: {country.population}
        <h5>Languages</h5>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="country flag" style={{width:400+'px', height: 'auto'}} />
      </div>
    )
  } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map(country =>
          <p key={country.name}>
            {country.name}
          </p>)}
      </ul>
    )
  } else {
    return (
      <p>Filter too vague, please use a more specific filter</p>
    )
  }

}
const FilterField = ({ handleFilterChange, newFilter }) => {
  return (
    <div>
      filter countries: <input onChange={handleFilterChange} value={newFilter} />
    </div>
  )
}
export default App