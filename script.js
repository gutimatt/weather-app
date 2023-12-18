/**
 * Weather App
 * DONE: Complete getWeatherData() to return json response Promise
 * DONE: Complete searchCity() to get user input and get data using getWeatherData()
 * DONE: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "7059d9d6a515bec4f3e0cbff1b367a39";

/**
 * Retrieve weather data from openweathermap
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const fullURL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  const weatherPromise = fetch(fullURL);
  return weatherPromise.then((response)=>{
    return response.json();
  })
}

/* 
* add event listener for weather input on enter 
*/
var input = document.getElementById("city-input");

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("Weather_Btn").click();
  }
});

/**
 * Retrieve city input and get the weather data
 */
searchCity = () => {
  const city = document.getElementById('city-input').value;
  getWeatherData(city).then((response)=>{
    console.log(response);
    if (response.cod != 200) {
      console.log(response.message)
      document.getElementById('city-name').innerText = response.message;
      document.getElementById('weather-type').innerText = "----"
      document.getElementById('temp').innerText = "--"
      document.getElementById('min-temp').innerText = "--"
      document.getElementById('max-temp').innerText = "--"
    } else {
      showWeatherData(response);
    }
  }).catch((error) =>{
    console.log(error);
  })
}

/**
 * Show the weather data in HTML
 */
showWeatherData = (weatherData) => {
  document.getElementById('city-name').innerText = weatherData.name;
  document.getElementById('weather-type').innerText = weatherData.weather[0].main;
  document.getElementById('temp').innerText = weatherData.main.temp;
  document.getElementById('min-temp').innerText = weatherData.main.temp_min;
  document.getElementById('max-temp').innerText = weatherData.main.temp_max;
}