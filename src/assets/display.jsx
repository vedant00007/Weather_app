// WeatherDisplay.jsx
import PropTypes from "prop-types";
import "./WeatherDisplay.css";

function WeatherDisplay({ Input, weatherData, darkMode }) {
  // Check if weatherData is not available yet or in a loading state
  if (!weatherData || !weatherData.main) {
    return <div></div>; // or some other placeholder or loading state
  }

  // Extract data from weatherData
  const {
    temp: temperature,
    feels_like: feelsLike,
    humidity,
    pressure,
  } = weatherData.main;
  const description = weatherData.weather[0].description;

  return (
    <div className={`weather-display ${darkMode ? "dark" : ""}`}>
      <h2>Weather Information of {Input}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      <p>Feels like: {feelsLike}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Pressure: {pressure}hPa</p>
    </div>
  );
}

WeatherDisplay.propTypes = {
  weatherData: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number,
      feels_like: PropTypes.number,
      humidity: PropTypes.number,
      pressure: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
      }),
    ),
  }),
  Input: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default WeatherDisplay;
