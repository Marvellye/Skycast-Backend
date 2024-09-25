const fs = require('fs');
const path = require('path');
const axios = require('axios');

const Keys = ['5f64c0a8e7ee1d05e1e7a2f6d5337c3f', 'eb2d6dd0cf555cc87f1b59f9d112052e'];
//const apiKey = Keys[Math.floor(Math.random() * Keys.length)];
const apiKey = "12c14f169e38e0b914a6143708abbfb5";

const OPENWEATHERMAP_API_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const IP_API_BASE_URL = 'https://api.marvelly.com.ng/ip';
const DATA_FILE_PATH = path.join(__dirname, 'ng.json'); // Path to ng.json

const getWeatherApiUrl = (lat, lon) =>
  `${OPENWEATHERMAP_API_BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${apiKey}`;

const fetchWeatherByLatLon = async (lat, lon) => {
  try {
    console.log('Fetching weather for coordinates:', lat, lon);
    const weatherApiUrl = getWeatherApiUrl(lat, lon);
    console.log('Weather API URL:', weatherApiUrl);
    const response = await axios.get(weatherApiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

const getStateCoordinates = (countryCode, stateName) => {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      console.error('Data file not found:', DATA_FILE_PATH);
      throw new Error('State data file is missing');
    }

    console.log('Reading state data for', countryCode, stateName);
    const data = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf8'));
    const state = data.find(
      (item) => item.country_code === countryCode && item.state_name.toLowerCase() === stateName.toLowerCase()
    );

    if (!state) {
      throw new Error(`State ${stateName} not found in ${countryCode}`);
    }

    console.log(`Found state coordinates: lat=${state.lat}, lon=${state.lon}`);
    return { lat: state.lat, lon: state.lon };
  } catch (error) {
    console.error('Error reading state coordinates:', error);
    throw new Error('Failed to get state coordinates');
  }
};

const fetchWeatherByState = async (countryCode, stateName) => {
  try {
    const { lat, lon } = getStateCoordinates(countryCode, stateName);
    console.log(`Coordinates for ${stateName}: lat=${lat}, lon=${lon}`);
    return await fetchWeatherByLatLon(lat, lon);
  } catch (error) {
    console.error('Error fetching weather data for state:', error);
    throw new Error('Failed to fetch weather data for the state');
  }
};

const fetchWeatherByIp = async (ip) => {
  try {
    console.log('Fetching weather for IP:', ip);
    const ipApiUrl = `${IP_API_BASE_URL}/?ip=${ip}`;
    console.log('IP API URL:', ipApiUrl);
    const ipResponse = await axios.get(ipApiUrl);
    const locationData = ipResponse.data;

    if (!locationData.loc) {
      throw new Error('Location data not found for this IP');
    }

    const [lat, lon] = locationData.loc.split(',');
    console.log(`Location data: lat=${lat}, lon=${lon}`);
    const weatherData = await fetchWeatherByLatLon(lat, lon);

    // Combine IP info and weather data
    return {
      location: locationData,
      weather: weatherData
    };
  } catch (error) {
    console.error('Error fetching weather or location data:', error);
    throw new Error('Failed to fetch weather or location data');
  }
};

module.exports = {
  fetchWeatherByLatLon,
  fetchWeatherByState,
  fetchWeatherByIp,
};