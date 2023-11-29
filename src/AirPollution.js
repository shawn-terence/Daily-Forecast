import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BarChartF from './BarChart';

const AirPollution = ({ location, apiKey }) => {
  const geoApi = 'https://api.openweathermap.org/geo/1.0/direct';
  const pollutionApi = 'https://api.openweathermap.org/data/2.5/air_pollution';
  
  const [coordinates, setCoordinates] = useState({});
  const [airPollution, setAirPollution] = useState({});

  useEffect(() => {
    fetch(`${geoApi}?q=${location}&limit=1&appid=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCoordinates({
            lat: data[0].lat,
            lon: data[0].lon,
          });
        }
      });
  }, [location, geoApi, apiKey]);

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      fetch(`${pollutionApi}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          setAirPollution(data);
        });
    }
  }, [coordinates, pollutionApi, apiKey]);

  const getAqiCategory = (aqi) => {
    if (aqi <= 1 ) {
      return 'Good';
    } else if (aqi <= 2) {
      return 'Fair';
    } else if (aqi === 3 ) {
      return 'Moderate';
    } else if (aqi === 4) {
      return 'Poor';
    } else if (aqi >=5) {
      return 'Very Poor';
    } else {
      return 'Invalid AQI';
    }
  };

  const formatDataForChart = () => {
    if (airPollution.list && airPollution.list.length > 0) {
      const { components } = airPollution.list[0];
      return Object.keys(components).map((key) => ({
        name: key.toUpperCase(),
        value: components[key],
      }));
    }
    return [];
  };

  return (
    <div id='air-Pollution'>
      <h1>Air Quality</h1>
      <p> Air condition: {airPollution.list && airPollution.list[0].main.aqi && getAqiCategory(airPollution.list[0].main.aqi)}</p>

      <BarChartF data={formatDataForChart()} />

      <Link to="/Pollutiondetails">
        <button className='Details-btn'>More Details </button>
      </Link>
    </div>
  );
};

export default AirPollution;
