import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [cityWeather, setCityWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    const _baseUrl = 'http://api.weatherstack.com/';
    axios
      .get(`${_baseUrl}/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setCityWeather(response.data);
        console.log(1213, response.data)
      })
  }, [country.capital, api_key])

  const weatherBlock = cityWeather.location ? 
    <div>
      <div><b>temperature: {cityWeather.current.temperature} Celsius</b></div>
      <img src={cityWeather.current.weather_icons[0]} alt=""/>
      <div><b>wind: </b> {cityWeather.current.wind_speed} kph, direction {cityWeather.current.wind_dir} </div>
    </div> : 
    <div>nothing</div>

  return (
    <div>
      <div key={country.name}>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {
            country.languages.map(l => <li key={l.name}>{l.name}</li>)
          }
        </ul>
        <img style={{maxWidth: '300px'}} src={country.flag} alt=""/>
        <h2>weather in {country.capital}</h2>
        {weatherBlock} 
      </div>
    </div>
  )
}

export default Country