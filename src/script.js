// Searched Location & Temperature Display 1/2
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "3dabf398aa6a2086da228af67b9eb50c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//City Start Page 2/2
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

// Geolocation - current Location 1/2
function searchLocation(position) {
  let apiKey = "3dabf398aa6a2086da228af67b9eb50c";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Change Degree Format 1/2
function changeDegreeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitChange = document.querySelector(".degree-display");
  fahrenheitChange.innerHTML = 68;
}

function changeDegreeCelsius(event) {
  event.preventDefault();
  let celsiusChange = document.querySelector(".degree-display");
  celsiusChange.innerHTML = 20;
}

// Day and Time Display 1/2
function showDay(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return `${day}`;
}

function showTime(now) {
  let hours = now.getHours();
  if(hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }  
  return `${hours}:${minutes}`;
}


// Day and Time Display 2/2
let now = new Date();

let dayDisplay = document.querySelector(".day-day");
dayDisplay.innerHTML = showDay(now); 

let timeDisplay = document.querySelector(".day-time");
timeDisplay.innerHTML = showTime(now); 


// Searched Location Display 2/2
let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);


// Change Degree Format
let degreeFahrenheit = document.querySelector("#fahrenheit");
degreeFahrenheit.addEventListener("click", changeDegreeFahrenheit);

let degreeCelsius = document.querySelector("#celsius");
degreeCelsius.addEventListener("click", changeDegreeCelsius);

// Geolocation - current Location 1/2
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// City Start Page 2/2
searchCity("Amsterdam");