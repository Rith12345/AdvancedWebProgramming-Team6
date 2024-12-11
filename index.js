const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// OpenWeatherMap API configuration
const OPENWEATHER_API_KEY = '89ffb578d7404c213055c2fcba02de98';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Enable CORS
app.use(cors());

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Weather API! Use /weather?country=<country_name>');
});

// Weather route for country
app.get('/weather', async (req, res) => {
  const { country } = req.query;

  // Check if country is provided
  if (!country) {
    return res.status(400).send('Country is required.');
  }

  try {
    // Call OpenWeatherMap API
    const response = await axios.get(OPENWEATHER_BASE_URL, {
      params: {
        q: country,
        appid: OPENWEATHER_API_KEY,
        units: 'metric', // Temperature in Celsius
      },
    });

    // Return weather data
    res.json(response.data);
  } catch (error) {
    // Handle errors from OpenWeatherMap API
    if (error.response) {
      return res.status(error.response.status).send(error.response.data.message);
    }
    res.status(500).send('An error occurred while fetching weather data.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
