import React, { useState, useEffect } from "react";
import BarChartF from "./BarChart";


function PollutionDetails({ loc, apiKey }) {
    const geoApi = 'http://api.openweathermap.org/geo/1.0/direct';
    const pollutionApi = 'http://api.openweathermap.org/data/2.5/air_pollution';
  
    const [coordinates, setCoordinates] = useState({});
    const [airPollution, setAirPollution] = useState({});
  
    useEffect(() => {
      fetch(`${geoApi}?q=${loc}&limit=1&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setCoordinates({
              lat: data[0].lat,
              lon: data[0].lon,
            });
          }
        });
    }, [loc, geoApi, apiKey]);
  
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
      if (aqi <= 1) {
        return 'Good';
      } else if (aqi <= 2) {
        return 'Fair';
      } else if (aqi === 3) {
        return 'Moderate';
      } else if (aqi === 4) {
        return 'Poor';
      } else if (aqi >= 5) {
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
        <div>
        <h1>Pollution Details</h1>
        {airPollution.list && airPollution.list.length > 0 ? (
          <div>
            <h2>Air Quality Index (AQI): {airPollution.list[0].main.aqi}</h2>
            <p>AQI Category: {getAqiCategory(airPollution.list[0].main.aqi)}</p>
            <h3>Components:</h3>
            <ul>
              {Object.keys(airPollution.list[0].components).map((key) => (
                <li key={key}>
                  {key.replace('_', ' ')}: {airPollution.list[0].components[key]}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No pollution data available</p>
        )}
        <BarChartF data={formatDataForChart()} />
      </div>
    );
  }
  
  export default PollutionDetails;
  