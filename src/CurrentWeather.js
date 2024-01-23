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
        return 'https://cdn1.iconfinder.com/data/icons/weather-471/128/CLOUDS-512.png';
      case 'Smoke':
          return 'https://cdn1.iconfinder.com/data/icons/weather-and-disaster-flat/340/fog_mist_cloud_air_smoke_effect_stream_smoky_dust-512.png';
      case 'Rain':
            return 'https://cdn3.iconfinder.com/data/icons/nature-emoji/50/Raining-512.png';
      case 'Drizzle':
              return 'https://cdn0.iconfinder.com/data/icons/weather-635/32/drizzle-64.png';
      case 'Snow':
      return 'https://cdn1.iconfinder.com/data/icons/snowy-christmas/96/christmas_snowflake_winter_snow_newyear_96-256.png';
      case 'Mist' :
           return 'https://cdn2.iconfinder.com/data/icons/unigrid-weather/56/027_fog_haze_mist_wind_direction_breeze_weather-512.png';
      case 'Fog':
           return 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_30-512.png'
      default:
        return null;
    }
  };
  const weatherIconUrl = getWeatherIcon(weatherDescription);

    return(
        <>
         {weather.name && (
          <div id="current-weather-container">
            <div id="cityname">
               <h2> {weather.name}</h2>
            </div>
              
                <div id="weather-container">
                  <div id="weather-icon-container">
                  {weatherIconUrl && <img src={weatherIconUrl} id="weather-icon" alt={weatherDescription} />}
                  <h1  id="temp"> {weather.main.temp}°</h1>
                  </div >
                  <div id="weather-schematics">
                      <p><h2>Current weather:{weatherDescription}</h2></p>
                      <p className="underlined">Feels Like: {weather.main.feels_like} °C</p>
                      <p className="underlined">Humidity: {weather.main.humidity}%</p>
                      <p className="underlined">Pressure: {weather.main.pressure} hPa</p>
                      <p className="underlined">Wind Speed: {weather.wind.speed} m/s</p>
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