const fs = require('fs');
const path = require('path');
const axios = require('axios');

const Keys = ['x', 'y'];
const apiKey = Keys[Math.floor(Math.random() * Keys.length)];

const OPENWEATHERMAP_API_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const IP_API_BASE_URL = 'https://api.marvelly.com.ng/ip';
const DATA_FILE_PATH = path.join(__dirname, 'ng.json'); // Path to ng.json

const getWeatherApiUrl = (lat, lon) =>
  `${OPENWEATHERMAP_API_BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${apiKey}`;

const fetchWeatherByLatLon = async (lat, lon) => {
  try {
    const weatherApiUrl = getWeatherApiUrl(lat, lon);
    console.log('Fetching weather data from URL:', weatherApiUrl);
    const response = await axios.get(weatherApiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw new Error('Failed to fetch weather data');
  }
};

const getStateCoordinates = (countryCode, stateName) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf8'));
    const state = data.find(
      (item) => item.country_code === countryCode && item.state_name.toLowerCase() === stateName.toLowerCase()
    );
    if (!state) {
      throw new Error(`State ${stateName} not found in ${countryCode}`);
    }
    return { lat: state.lat, lon: state.lon };
  } catch (error) {
    console.error('Error reading state coordinates:', error.message);
    throw new Error('Failed to get state coordinates');
  }
};

const fetchWeatherByState = async (countryCode, stateName) => {
  try {
    const { lat, lon } = getStateCoordinates(countryCode, stateName);
    console.log(`Coordinates for ${stateName}: lat=${lat}, lon=${lon}`);
    return await fetchWeatherByLatLon(lat, lon);
  } catch (error) {
    console.error('Error fetching weather data for state:', error.message);
    throw new Error('Failed to fetch weather data for the state');
  }
};

const fetchWeatherByIp = async (ip) => {
  try {
    const ipApiUrl = `${IP_API_BASE_URL}/?ip=${ip}`;
    const ipResponse = await axios.get(ipApiUrl);
    const locationData = ipResponse.data;

    if (!locationData.loc) {
      throw new Error('Location data not found for this IP');
    }

    const [lat, lon] = locationData.loc.split(',');
    const weatherData = await fetchWeatherByLatLon(lat, lon);

    // Combine IP info and weather data
    return {
      location: locationData,
      weather: weatherData
    };
  } catch (error) {
    console.error('Error fetching weather or location data:', error.message);
    throw new Error('Failed to fetch weather or location data');
  }
};

module.exports = {
  fetchWeatherByLatLon,
  fetchWeatherByState,
  fetchWeatherByIp,
};