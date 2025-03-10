// Function to fetch weather data from the Open Mateo Weather API
async function getWeatherData(param) {
  try {
    const response = await fetch(apiUrl);

    // If the response is not ok, throws an error
    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    // Parse the response as JSON
    const data = await response.json();

    // Returns the specified weather parameter from the current weather data
    return data.current[param];
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

// Function to update the weather data
async function updateWeatherData(type, textElementId) {
  const textElement = document.getElementById(textElementId);

  // Checks if the element exists
  if (!textElement) {
    console.error("Invalid ID element.");
    return;
  }

  textElement.textContent = "Loading. . ."; // Temporary text while fetching data
  const weatherData = await getWeatherData(type); // Fetches the weather data based on specified type

  // Checks if the weather data is valid (not null or undefined
  if (weatherData !== null && weatherData !== undefined) {
    textElement.textContent = `${formatText(type)} ${weatherData} ${weatherUnits[type] || ""}`;
  } else {
    textElement.textContent = "Error - No Data Available";
  }
}

// Function to format the text based on the type of weather data
function formatText(type) {
  // Uses a switch statement to return the appropriate label for each weather type
  switch (type) {
    case "temperature_2m": return "Temperature:";
    case "rain": return "Rain:";
    case "cloud_cover": return "Cloud Cover:";
    case "wind_speed_10m": return "Wind Speed:";
    default: return ""; // Return an empty string for unknown types
  }
}

// API URL to fetch weather data
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=33.767&longitude=-118.1892&current=temperature_2m,rain,cloud_cover,wind_speed_10m&timezone=America%2FLos_Angeles"

// Get button elements by their IDs
const temperatureBtn = document.getElementById("temperature-button");
const rainBtn = document.getElementById("rain-button");
const cloudBtn = document.getElementById("cloud-button");
const windBtn = document.getElementById("wind-button");

// Object to store weather units for different types of data
const weatherUnits = {
  "temperature_2m": "°C",
  "rain": "mm",
  "cloud_cover": "%",
  "wind_speed_10m": "km/h"
}

document.addEventListener("DOMContentLoaded", () => {
  updateWeatherData("temperature_2m", "temperature-text")
  updateWeatherData("rain", "rain-text")
  updateWeatherData("cloud_cover", "cloud-text")
  updateWeatherData("wind_speed_10m", "wind-text")

  temperatureBtn.addEventListener("click", () => updateWeatherData("temperature_2m", "temperature-text"));
  rainBtn.addEventListener("click", () => updateWeatherData("rain", "rain-text"));
  cloudBtn.addEventListener("click", () => updateWeatherData("cloud_cover", "cloud-text"));
  windBtn.addEventListener("click", () => updateWeatherData("wind_speed_10m", "wind-text"));
});
