const express = require('express');
const cors = require('cors');
const path = require('path');
const { fetchWeatherByLatLon, fetchWeatherByState, fetchWeatherByIp } = require('./libs/process');

const app = express();
app.use(cors());

// Serve static files from the ./libs directory
app.use(express.static(path.join(__dirname, 'libs')));

// Route to serve the HTML documentation
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'libs', 'doc.html'));
});

// Route to get the client's IP address
app.get('/ip', (req, res) => {
    const ipList = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const mainIp = ipList.split(',')[0].trim();
    res.json({ IP: mainIp });
});

// Route to fetch weather by lat/lon
app.get('/weather', async (req, res) => {
    const { lon, lat } = req.query;
    if (!lon || !lat) {
        return res.status(400).json({ error: 'Longitude and latitude are required' });
    }
    try {
        const weatherData = await fetchWeatherByLatLon(lat, lon);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch weather by IP parameter
app.get('/ipweather/:ip', async (req, res) => {
    const ip = req.params.ip;
    try {
        const weatherData = await fetchWeatherByIp(ip);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch weather for the state by country code
app.get('/weather/:country_code/:state', async (req, res) => {
    const { country_code, state } = req.params;
    try {
        const weatherData = await fetchWeatherByState(country_code, state);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch weather based on client's IP address
app.get('/this-weather', async (req, res) => {
    try {
        // Get the client's IP address using the same method as in /ip
        const ipList = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const mainIp = ipList.split(',')[0].trim();

        // Fetch weather data based on the client's IP address
        const weatherData = await fetchWeatherByIp(mainIp);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data for the client\'s IP' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});