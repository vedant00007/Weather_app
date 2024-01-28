import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import cities from "cities.json";
import WeatherDisplay from "./display";
import "./WeatherInfo.css"; // Import a separate CSS file for styling

function WeatherInfo() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lat && lng) {
      setLoading(true);

      axios
        .get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            appid: "3f55aeeee82dcd66bd1dba96f5d05aba",
            lat: lat,
            lon: lng,
            units: "metric",
          },
        })
        .then((response) => {
          const data = response.data;
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data", error);
          alert("Error fetching weather data. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [lat, lng]);

  const findCity = () => {
    const input = cityInput.trim();
    const formattedInput =
      input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    setCityInput(formattedInput);

    const city = cities.find((city) => city.name === formattedInput);
    if (city) {
      setLat(city.lat);
      setLng(city.lng);
    } else {
      alert(`${formattedInput} not found in database`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    findCity();
  };

  return (
    <div className={`weather-info ${loading ? "loading" : ""}`}>
      <form onSubmit={handleFormSubmit}>
        <input
          id="city"
          type="text"
          placeholder="Location"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button type="submit" id="SubmitButton">
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {weatherData && !loading && (
        <WeatherDisplay weatherData={weatherData} Input={cityInput} />
      )}

      {!loading && !weatherData && <p>No weather data available.</p>}
    </div>
  );
}

WeatherInfo.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  weatherData: PropTypes.object,
  cityInput: PropTypes.string,
  loading: PropTypes.bool,
};

export default WeatherInfo;
