// Home.js
import React, { useEffect, useState } from 'react';
import { Route, Routes,Link } from 'react-router-dom';
import Navbar from './Navbar';
import CurrentWeather from './CurrentWeather';
import AirPollution from './AirPollution';
import WeatherDetails from './WeatherDetails';
import PollutionDetails from './PollutionDetails';
import './App.css'


function Home() {
  const key = 'dcbfc041780739f54647455e1945b633';
  const api = 'https://api.openweathermap.org/data/2.5/weather';

  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('Nairobi');

  useEffect(() => {
    fetch(`${api}?q=${city}&units=metric&appid=${key}`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }, [city, api, key]);

  return (
    <div className="Home">
      <Navbar city={city} setCity={setCity} />
      <Routes>
        <Route
          path="/"
          element={
            city && city.length > 0 ? (
              <>
                <CurrentWeather weather={weather} />
                <AirPollution location={city} apiKey={key} />
              </>
            ) : (
              weather.name && (
                <div>
                  <h1>City: {weather.name}</h1>
                  <p>Temperature: {weather.main.temp} °C</p>
                  <p>Feels Like: {weather.main.feels_like} °C</p>
                  <p>Humidity: {weather.main.humidity}%</p>
                  <p>Pressure: {weather.main.pressure} hPa</p>
                  <p>Wind Speed: {weather.wind.speed} m/s</p>

                </div>
              )
            )
          }
        />
        <Route
            path='/Weatherdetails'
            element={<WeatherDetails cit={city}/>}
        />
        <Route
                path='/Pollutiondetails'
                element={<PollutionDetails loc={city} apiKey={key}/>}
        />
      </Routes>
    </div>
  );
}

export default Home;
