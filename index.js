const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { fetchWeatherByLatLon, fetchWeatherByState, fetchWeatherByIp } = require('./libs/process');

const app = express();
app.use(cors());

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather API',
      version: '1.0.0',
      description: 'API for fetching weather data by different parameters - marvelly x vector',
    },
    servers: [
      {
        url: 'https://skycast-backend-live.onrender.com/',
      },
    ],
  },
  apis: ['./index.js'], // File with API documentation comments
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve static files from the ./libs directory
app.use(express.static(path.join(__dirname, 'libs')));

// Route to serve the HTML documentation
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'libs', 'doc.html'));
});

/**
 * @swagger
 * /ip:
 *   get:
 *     summary: Get the client's IP address
 *     tags: [Skycast]
 *     responses:
 *       200:
 *         description: Returns the client's IP address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IP:
 *                   type: string
 *                   example: 192.168.1.1
 */
app.get('/ip', (req, res) => {
    const ipList = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const mainIp = ipList.split(',')[0].trim();
    res.json({ IP: mainIp });
});

/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Fetch weather by latitude and longitude
 *     tags: [Skycast]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         description: Latitude
 *         schema:
 *           type: string
 *       - in: query
 *         name: lon
 *         required: true
 *         description: Longitude
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns weather data for the provided latitude and longitude
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
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

/**
 * @swagger
 * /ipweather/{ip}:
 *   get:
 *     summary: Fetch weather by IP address
 *     tags: [Skycast]
 *     parameters:
 *       - in: path
 *         name: ip
 *         required: true
 *         description: IP address to fetch weather for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns weather data for the provided IP address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get('/ipweather/:ip', async (req, res) => {
    const ip = req.params.ip;
    try {
        const weatherData = await fetchWeatherByIp(ip);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /weather/{country_code}/{state}:
 *   get:
 *     summary: Fetch weather by country code and state
 *     tags: [Skycast]
 *     parameters:
 *       - in: path
 *         name: country_code
 *         required: true
 *         description: 2-letter country code
 *         schema:
 *           type: string
 *       - in: path
 *         name: state
 *         required: true
 *         description: State name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns weather data for the provided country code and state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get('/weather/:country_code/:state', async (req, res) => {
    const { country_code, state } = req.params;
    try {
        const weatherData = await fetchWeatherByState(country_code, state);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /this-weather:
 *   get:
 *     summary: Fetch weather for the client's IP address
 *     tags: [Skycast]
 *     responses:
 *       200:
 *         description: Returns weather data for the client's IP address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.get('/this-weather', async (req, res) => {
    try {
        const ipList = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const mainIp = ipList.split(',')[0].trim();
        const weatherData = await fetchWeatherByIp(mainIp);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data for the client\'s IP' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});