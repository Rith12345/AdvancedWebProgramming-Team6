const axios = require('axios');

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "89ffb578d7404c213055c2fcba02de98"
};

const weatherData = (address, callback) => {
    const url = `${openWeatherMap.BASE_URL}${encodeURIComponent(address)}&appid=${openWeatherMap.SECRET_KEY}`;
    axios.get(url)
        .then(response => {
            callback(false, response.data);
        })
        .catch(error => {
            callback(true, "Unable to fetch data, please try again. " + error);
        });
};

module.exports = weatherData;
