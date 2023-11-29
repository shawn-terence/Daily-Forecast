import React from "react";
import { Link } from "react-router-dom";


function CurrentWeather({ weather }) {
  const weatherDescription =
    weather.name && weather.weather && weather.weather.length > 0
      ? weather.weather[0].main
      : null;

  const getWeatherIcon = (description) => {
    switch (description) {
      case 'Clear':
        return 'https://cdn1.iconfinder.com/data/icons/weather-line-5/500/weather-01-256.png';
      case 'Clouds':
        return 'https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-2-64.png';
      case 'Smoke':
          return 'https://cdn4.iconfinder.com/data/icons/air-pollution-6/128/factory_smoke_pollution_air_industry-64.png';
      case 'Rain':
            return 'https://cdn2.iconfinder.com/data/icons/weather-119/512/weather-5-64.png';
      case 'Drizzle':
              return 'https://cdn0.iconfinder.com/data/icons/weather-635/32/drizzle-64.png';
      case 'Snow':
      return 'https://cdn4.iconfinder.com/data/icons/free-line-christmas-icons/24/Snowflake-64.png';
      default:
        return null;
    }
  };
  const weatherIconUrl = getWeatherIcon(weatherDescription);

    return(
        <>
         {weather.name && (
          <div id="current-weather-container">
              <h1> {weather.name}</h1>
                <div id="weather-container">
                  <div id="weather-icon-container">
                  {weatherIconUrl && <img src={weatherIconUrl} id="weather-icon" alt={weatherDescription} />}
                  </div >
                  <div id="weather-schematics">
                      <p>Temp: {weather.main.temp} °C</p>
                      <p>Feels Like: {weather.main.feels_like} °C</p>
                      <p>Humidity: {weather.main.humidity}%</p>
                      <p>Pressure: {weather.main.pressure} hPa</p>
                      <p>Wind Speed: {weather.wind.speed} m/s</p>
                      <Link to="/Weatherdetails">
                                <button className="Details-btn">
                                More Details
                                </button>
                      </Link>
                  </div>

                </div>
          </div>

          )}
        </>

    )
}

export default CurrentWeather