import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar({city,setCity}){
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add additional logic here if needed
    };

    return(
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    )
}
export default Navbar