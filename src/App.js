import { useEffect, useState } from 'react';

function App() {
  const [city, setCity] = useState('Karachi');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "fdb6d0f09c43598181f137ab66b7be00";

  const fetchWeatherData = async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const getWeatherEmoji = (weatherId) => {
    if (!weatherId) return '🌤️';
    if (weatherId >= 200 && weatherId < 300) return '⛈️';
    if (weatherId >= 300 && weatherId < 400) return '🌧️';
    if (weatherId >= 500 && weatherId < 600) return '🌧️';
    if (weatherId >= 600 && weatherId < 700) return '❄️';
    if (weatherId >= 700 && weatherId < 800) return '🌫️';
    if (weatherId === 800) return '☀️';
    return '☁️';
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="date">{formattedDate}</h1>
        
        {error && <div className="error">{error}</div>}
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        ) : weatherData && (
          <div className="weather-info">
            <h2 className="city">{weatherData.name}</h2>
            <div className="weather-icon">
              {getWeatherEmoji(weatherData.weather[0].id)}
            </div>
            <h2 className="temperature">
              {Math.round(weatherData.main.temp)}°C
            </h2>
            <p className="description">
              {weatherData.weather[0].description}
            </p>
            
            <div className="details">
              <div className="detail-item">
                <span className="label">Humidity</span>
                <span className="value">{weatherData.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label">Wind</span>
                <span className="value">{weatherData.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="label">Feels Like</span>
                <span className="value">{Math.round(weatherData.main.feels_like)}°C</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {/* Your Name */}
        <div className="footer">
          <p>Developed by Syed Mustafa</p>
        </div>
      </div>
    </div>
  );
}

export default App;
