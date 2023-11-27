import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

function App() {
  const key = 'dcbfc041780739f54647455e1945b633';
  const api = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
  
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('');

  useEffect(() => {
    fetch(api + city + '&appid=' + key)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
      });
  }, [city, api, key]);


  return (
    <div className="App">
      <Navbar city={city} setCity={setCity}/>
      {weather.name && (
        <div>
          <h1>City: {weather.name}</h1>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Feels Like: {weather.main.feels_like} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;


