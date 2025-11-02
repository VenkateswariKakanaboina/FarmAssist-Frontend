import React, { useEffect, useState } from "react";
import "./WeatherPanel.css";

const WeatherPanel = ({ location }) => {
  const [weather, setWeather] = useState("Loading...");

  useEffect(() => {
    if (location) {
      fetch(`https://wttr.in/${location}?format=3`)
        .then(res => res.text())
        .then(setWeather)
        .catch(() => setWeather("Weather unavailable"));
    }
  }, [location]);

  return (
    <div className="weather-panel">
      <h4>🌤️ Weather in {location}</h4>
      <p>{weather}</p>
    </div>
  );
};

export default WeatherPanel;
