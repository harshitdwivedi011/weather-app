import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherInfo = async (cityName) => {
    try {
      const query = cityName.trim() === "" ? "Patna" : cityName;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherInfo("");
  }, []);

  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          placeholder="Search by City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeatherInfo(city)}>
          <i className="fa fa-magnifying-glass"></i>
        </button>
      </div>

      {weatherData ? (
        <section>
          {weatherData.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`}
              alt="weather icon"
            />
          )}
          <p className="temp">{Math.floor(weatherData?.main.temp - 273)}°C</p>
          <h3>{weatherData?.name}</h3>

          <div id="temp">
            <p>
              Sunrise:{" "}
              {new Date(weatherData.sys?.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              Sunset:{" "}
              {new Date(weatherData.sys?.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>

          <section className="other-details">
            <p>Date: {new Date(weatherData?.dt * 1000).toLocaleString()}</p>
            <div>
              <i className="fa fa-droplet"></i>
              <p>{weatherData?.main?.humidity}% </p>
              <small>Humidity</small>
            </div>
            <div>
              <i className="fa fa-wind"></i>
              <p>{weatherData?.wind?.speed} m/s </p>
              <small>Wind Speed </small>
            </div>
          </section>
        </section>
      ) : null}
    </div>
  );
}

export default App;
