import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Country from './components/Country'
import CountriesList from './components/CountriesList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const filteredCountries = 
    countries.filter(c => c.name.toUpperCase().includes(searchQuery.toUpperCase())) || []
  const isShowOneCountry = filteredCountries && filteredCountries.length === 1
  const isShowCountriesList = filteredCountries && filteredCountries.length <= 10

  const handleSearch = (e) => setSearchQuery(e.target.value)

  const handleShowCountry = (name) => setSearchQuery(name)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  console.log('render', filteredCountries, 'filteredCountries')

  return (
    <div>
      <div>
        find countries
        <input value={searchQuery} onChange={handleSearch} type="text"/>
      </div>
      <div>
        { 
          isShowOneCountry ? 
            <Country country={filteredCountries[0]} /> :
            isShowCountriesList ?
              <CountriesList countries={filteredCountries} handleShowCountry={handleShowCountry} /> :
              <div>Too many matches, specify another filter</div>
        }
      </div>
    </div>
  );
}

export default App;