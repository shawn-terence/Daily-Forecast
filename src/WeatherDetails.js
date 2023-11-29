import React, { useState, useEffect } from 'react';


function WeatherDetails({ cit }) {
  const key = 'dcbfc041780739f54647455e1945b633';
  const api = 'https://api.openweathermap.org/data/2.5/weather';

  const [weatherDetails, setWeather] = useState({});

  useEffect(() => {
    fetch(`${api}?q=${cit}&units=metric&appid=${key}`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }, [cit, api, key]);

  return (
    <div>
      <h1>WeatherDetails</h1>
      {weatherDetails.weather && weatherDetails.weather.length > 0 && (
        <div>
          <h3>Weather: {weatherDetails.weather[0].main}</h3>
          <div>
            <p>Description: {weatherDetails.weather[0].description}</p>
          </div>
  
          <div id='wind-temp-div'>
            <div id='temp-div'>
              <img src={'https://cdn-icons-png.flaticon.com/128/9644/9644773.png'} alt="Temperature Icon" />
              <div>
                <p>Temperature: {weatherDetails.main.temp} °C</p>
                <p>Feels Like: {weatherDetails.main.feels_like} °C</p>
                <p>Minimum Temperature: {weatherDetails.main.temp_min} °C</p>
                <p>Maximum Temperature: {weatherDetails.main.temp_max} °C</p>
              </div>
            </div>
  
            <div id='wind-div'>
              <p>Pressure: {weatherDetails.main.pressure} hPa</p>
              <p>Humidity: {weatherDetails.main.humidity}%</p>
              <p>Visibility: {weatherDetails.visibility} meters</p>
              <p>Wind Speed: {weatherDetails.wind.speed} m/s</p>
              <p>Wind Direction: {weatherDetails.wind.deg} degrees</p>
              <p>Rain (1h): {weatherDetails.rain ? weatherDetails.rain['1h'] : 0} mm</p>
              <div>
                <img src='https://cdn-icons-png.flaticon.com/128/12448/12448106.png' alt="Cloudiness Icon" />
                <p>Cloudiness: {weatherDetails.clouds.all}%</p>
              </div>
            </div>
          </div>
  
          <div id='sun-div'>
            <p>Sunrise: {weatherDetails.sys && new Date(weatherDetails.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {weatherDetails.sys && new Date(weatherDetails.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherDetails;
