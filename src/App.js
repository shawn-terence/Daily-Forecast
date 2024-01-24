import React from 'react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import {useState,useEffect} from 'react';
import "./App.css"
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkAndSetDarkMode = () => {
      const currentHour = new Date().getHours();

      // Set dark mode if the current hour is 6 or later
      setIsDarkMode(currentHour >= 18 || currentHour < 6);
    };

    // Call the function initially
    checkAndSetDarkMode();

    // Set up an interval to check and update the dark mode every minute
    const intervalId = setInterval(checkAndSetDarkMode, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount
  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <BrowserRouter>
      <Home isDarkMode={isDarkMode} />
      </BrowserRouter>
    </div>
  );
}

export default App;


