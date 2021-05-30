import React from 'react'

const CountriesList = ({countries, handleShowCountry}) => {
  return (
    <ul>
      {
        countries.map(c => 
        <li key={c.name}>
          {c.name}
          <button onClick={() => handleShowCountry(c.name)}>show</button>
        </li>)
      }
    </ul>
  )
}

export default CountriesList