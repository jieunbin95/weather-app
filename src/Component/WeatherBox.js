import React from 'react'

const WeatherBox = ({weather}) => {
  console.log('weather?',weather)

  return (
    <div className="box">
      <div className="title">{weather?.name}</div>
      <h2>{weather?.main.temp}°C <br></br>{(weather?.main.temp*1.8+32).toFixed(2)}°F</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox