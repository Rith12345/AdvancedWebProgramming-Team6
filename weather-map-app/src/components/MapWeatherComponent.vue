<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

const country = ref(""); // Store the user's input for the country
const weather = ref<any | null>(null); // Store weather data
const error = ref<string | null>(""); // Store errors

// Fetch weather for the entered country
const fetchWeather = async () => {
  if (!country.value) {
    error.value = "Please enter a country.";
    weather.value = null;
    return;
  }

  try {
    const response = await axios.get(
      `http://localhost:3000/weather?country=${country.value}`
    );
    weather.value = response.data;
    error.value = null;
  } catch (err: any) {
    weather.value = null;
    error.value = err.response?.data || "Unable to fetch weather data.";
  }
};
</script>

<template>
  <div style="text-align: center;">
    <h2>Weather Finder</h2>
    <!-- Input for country -->
    <div style="margin-bottom: 20px;">
      <input
        v-model="country"
        placeholder="Enter a country"
        style="padding: 10px; width: 200px;"
      />
      <button @click="fetchWeather" style="padding: 10px 20px;">Get Weather</button>
    </div>

    <!-- Display Weather Data -->
    <div v-if="weather" style="margin-top: 20px;">
      <h3>Weather in {{ weather.name }}</h3>
      <p>Temperature: {{ weather.main.temp }}°C</p>
      <p>Condition: {{ weather.weather[0].description }}</p>
      <p>Humidity: {{ weather.main.humidity }}%</p>
      <p>Pressure: {{ weather.main.pressure }} hPa</p>
    </div>

    <!-- Display Error Message -->
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<style scoped>
/* Optional styles for better presentation */
input {
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
