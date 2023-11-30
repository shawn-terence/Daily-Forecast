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
        name: key.toUpperCase().replace('_', ' '),
        value: components[key],
      }));
    }
    return [];
  };

  const getPollutantCategory = (value, pollutant) => {
    const pollutantThresholds = {
      co: { good: 2, fair: 9, moderate: 15, high: 30, dangerous: 40 },
      no: { good: 0.5, fair: 1, moderate: 2, high: 5, dangerous: 10 },
      no2: { good: 5, fair: 10, moderate: 20, high: 40, dangerous: 50 },
      o3: { good: 30, fair: 50, moderate: 100, high: 168, dangerous: 200 },
      so2: { good: 1, fair: 5, moderate: 20, high: 40, dangerous: 50 },
      'pm2.5': { good: 12, fair: 35, moderate: 55, high: 150, dangerous: 250 },
      pm10: { good: 20, fair: 50, moderate: 100, high: 350, dangerous: 420 },
      nh3: { good: 5, fair: 15, moderate: 30, high: 60, dangerous: 100 },
    };

    const thresholds = pollutantThresholds[pollutant.toLowerCase()];

    if (!thresholds) {
      return 'Unknown';
    }

    if (value <= thresholds.good) {
      return 'Good';
    } else if (value <= thresholds.fair) {
      return 'Fair';
    } else if (value <= thresholds.moderate) {
      return 'Moderate';
    } else if (value <= thresholds.high) {
      return 'High';
    } else {
      return 'Dangerous';
    }
  };

  const getFullPollutantName = (abbreviation) => {
    const pollutantNames = {
      co: 'Carbon Monoxide',
      no: 'Nitric Oxide',
      no2: 'Nitrogen Dioxide',
      o3: 'Ozone',
      so2: 'Sulfur Dioxide',
      'pm2_5': 'Fine Particulate Matter ',
      pm10: 'Particulate Matter 10',
      nh3: 'Ammonia',
    };

    return pollutantNames[abbreviation.toLowerCase()] || abbreviation;
  };

  const getRecommendation = (category, pollutant) => {
    switch (category) {
      case 'Good':
        return `No precautionary measures needed for ${getFullPollutantName(pollutant)}.`;
      case 'Fair':
        return `People with respiratory or heart conditions may be affected. Consider reducing prolonged or heavy exertion for ${getFullPollutantName(pollutant)}.`;
      case 'Moderate':
        return `Unusually sensitive people should consider reducing prolonged or heavy exertion for ${getFullPollutantName(pollutant)}.`;
      case 'High':
        return `Health alert: everyone may begin to experience health effects. Members of sensitive groups may experience more serious health effects for ${getFullPollutantName(pollutant)}.`;
      case 'Dangerous':
        return `Health warnings of emergency conditions: the entire population is more likely to be affected for ${getFullPollutantName(pollutant)}.`;
      default:
        return `Unknown recommendation for ${getFullPollutantName(pollutant)}.`;
    }
  };

  return (
    <div id="Pollution-container">
      <h1>Pollution Details</h1>

      {airPollution.list && airPollution.list.length > 0 ? (
        <div>
          <div id="pollution-chart-details">
            <h2>Air Quality Index (AQI): {airPollution.list[0].main.aqi}</h2>
            <p>AQI Category: {getAqiCategory(airPollution.list[0].main.aqi)}</p>
            <h3>Components:</h3>
            <BarChartF data={formatDataForChart()} />
            <ul>
              {Object.keys(airPollution.list[0].components).map((key) => (
                <li key={key}>
                  {getFullPollutantName(key)}: {airPollution.list[0].components[key]}
                </li>
              ))}
            </ul>
          </div>
          <div id="pollutant-levels">
            <h1>Pollutant levels</h1>
              {Object.keys(airPollution.list[0].components).map((key) => (
                <div id="pollutant" key={key}>
                  <h2>{getFullPollutantName(key)}</h2>
                  <p>Amount: {airPollution.list[0].components[key]}</p>
                  <p>Pollution Level: {getPollutantCategory(airPollution.list[0].components[key], key)}</p>
                  <p>Recommendation: {getRecommendation(getPollutantCategory(airPollution.list[0].components[key], key), key)}</p>
                </div>
              ))}
            </div>

          </div>
      ) : (
        <p>No pollution data available</p>
      )}
      <div>
        
        {/* You can add specific pollutant levels here */}
      </div>
    </div>
  );
}

export default PollutionDetails;
