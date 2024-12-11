const express = require('express');
const path = require("path");
const app = express();
const port = 3000; // You can choose any port that is free on your system

// Correct the path to the relative path assuming weatherData.js is in the same directory
const weatherData = require("./weatherData");

app.get('/', (req, res) => {
  res.send("Weather app running");
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Address is required');
    }
    weatherData(req.query.address, (error, result) => {
        if (error) {
            return res.send('Error: ' + result);
        }
        res.send(result);
    });
});

app.get("*", (req, res) => {
    res.send("This route doesn't exists");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
