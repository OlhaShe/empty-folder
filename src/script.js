const getCurrentTimeDate = () => {
  let currentTimeDate = new Date();

  var weekday = new Array(7);
  weekday[0] = "SUNDAY";
  weekday[1] = "MONDAY";
  weekday[2] = "TUERSDAY";
  weekday[3] = "WEDNESDAY";
  weekday[4] = "THURSDAY";
  weekday[5] = "FRIDAY";
  weekday[6] = "SATERDAY";

  var month = new Array();
  month[0] = "JAN";
  month[1] = "FEB";
  month[2] = "MAR";
  month[3] = "APR";
  month[4] = "May";
  month[5] = "JUN";
  month[6] = "JUL";
  month[7] = "AUG";
  month[8] = "SEP";
  month[9] = "OCT";
  month[10] = "NOV";
  month[11] = "DEC";

  var hours = currentTimeDate.getHours();

  var minutes = currentTimeDate.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var AMPM = hours >= 12 ? "PM" : "AM";

  if (hours === 12) {
    hours = 12;
  } else {
    hours = hours % 12;
  }

  var currentTime = `${hours}:${minutes}${AMPM}`;
  var currentDay = weekday[currentTimeDate.getDay()];

  var currentDate = currentTimeDate.getDate();
  var currentMonth = month[currentTimeDate.getMonth()];
  var CurrentYear = currentTimeDate.getFullYear();

  var fullDate = `${currentDate} ${currentMonth} ${CurrentYear}`;

  document.getElementById("time").innerHTML = currentTime;
  document.getElementById("day").innerHTML = currentDay;
  document.getElementById("date").innerHTML = fullDate;

  setTimeout(getCurrentTimeDate, 500);
};
getCurrentTimeDate();

function findTemperatureForSearchedCity(response) {
  let getTemperatureForSearchedCity = Math.round(response.data.main.temp);
  let displayTemperatureForSearchedCity =
    document.querySelector("#temperature");
  displayTemperatureForSearchedCity.innerHTML = `${getTemperatureForSearchedCity}°`;
}

function displayHumidity(response) {
  let getHumidityForSearchedCity = response.data.main.humidity;
  console.log(getHumidityForSearchedCity);
  let displayHumidityForSearchedCity = document.querySelector("#humidity");
  displayHumidityForSearchedCity.innerHTML = `Humidity: ${getHumidityForSearchedCity}%`;
}

function displayWind(response) {
  let getWindForSearchedCity = Math.round(response.data.wind.speed);

  console.log(getWindForSearchedCity);

  let displayWindForSearchedCity = document.querySelector("#windW");
  displayWindForSearchedCity.innerHTML = `Wind: ${getWindForSearchedCity} km/h`;
}

function getSearchedCityName(event) {
  event.preventDefault();

  let searchedCity = document.querySelector("#city");

  let selectCityElement = document.querySelector("#selected-city");
  selectCityElement.innerHTML = `${searchedCity.value}`;

  let apiKey = `b40b135798f82a05aed08769f9275f50`;
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(findTemperatureForSearchedCity);
  axios.get(apiUrl).then(displayHumidity);
  axios.get(apiUrl).then(displayWind);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", getSearchedCityName);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(success);
});

function success(position) {
  let coordinates = position.coords;
  console.log(coordinates);
}

// let searchedCity = document.querySelector("#city");
// console.log(searchedCity);

// const btn = document.querySelector("#show");
// btn.addEventListener("click", function () {
//   // get the current position
//   navigator.geolocation.getCurrentPosition(onSuccess, onError);
// });
