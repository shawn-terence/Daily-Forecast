// Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css"

function Navbar({ city, setCity, isDarkMode }) {
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navContainerStyles = {
    backgroundColor:isDarkMode ? '#87CEEB' : '#0b83b2',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const linkStyles = {
    padding: '10px',
    marginRight: '10px',
    textDecoration: 'none',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const logoImageSrc = isDarkMode
    ? 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_17-64.png'
    : 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_18-512.png';

  return (
    <>
      <div id="nav-container" className={isDarkMode ? 'dark_mode_nav' : 'light_mode_nav'}>
        <div id="web-logo">
          <img src={logoImageSrc} className="Appicon" alt="Logo"></img>
          <h2>Daily Forecast</h2>
        </div>

        <form id="input-form" onSubmit={handleSubmit}>
          <input
            id="search-input"
            type="text"
            placeholder="Input city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>

        <nav>
          {location.pathname !== '/' && (
            <NavLink
              to="/"
              exact
              style={linkStyles}
              activeStyle={{
                background: isDarkMode ? '#4d4d4d' : 'lightblue',
              }}
            >
              Home
            </NavLink>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
