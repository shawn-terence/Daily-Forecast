/* global location */
import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Navbar({city,setCity}){
    const location = useLocation()
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const linkStyles = {
        padding: '10px',
        marginRight: '10px',
        textDecoration: 'none',
        color: 'black',
      };
    return(
        <>
        <div id="nav-container">
            <div id="web-logo" >
                <img src="https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_17-64.png" ></img>
                <h2>Daily Forecast</h2>
            </div>


                <form id="input-form" onSubmit={handleSubmit}>
                    <input id="search-input"
                    type="text"
                    placeholder="Input city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                    
                </form>
                <nav>
                    {window.location.pathname !== '/' && (
                        <NavLink
                        to="/"
                        exact
                        style={linkStyles}
                        activeStyle={{
                            background: 'lightblue',
                        }}
                        >
                        Home
                        </NavLink>
                    )}
            </nav>
        </div>

        </>

    )
}
export default Navbar