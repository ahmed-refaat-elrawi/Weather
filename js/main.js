let city = document.getElementById("searchInput");
let findButton = document.getElementById("findButton");
let weatherLocation = document.getElementById("weatherLocation");
let currentTemperature = document.getElementById("currentTemperature");
let currentIcon = document.getElementById("currentIcon");
let currentCondition = document.getElementById("currentCondition");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");
let humidity = document.getElementById("humidity");
let currentWeekDay = document.getElementById("currentWeekDay");
let currentMonthDay = document.getElementById("currentMonthDay");
let tomorrowDay = document.getElementById("tomorrowDay");
let afterTomorrowDay = document.getElementById("afterTomorrowDay");
let tomorrowIcon = document.getElementById("tomorrowIcon");
let tomorrowMaxTemp = document.getElementById("tomorrowMaxTemp");
let tomorrowMinTemp = document.getElementById("tomorrowMinTemp");
let tomorrowCondition = document.getElementById("tomorrowCondition");
let afterTomorrowIcon = document.getElementById("afterTomorrowIcon");
let afterTomorrowMaxTemp = document.getElementById("afterTomorrowMaxTemp");
let afterTomorrowMinTemp = document.getElementById("afterTomorrowMinTemp");
let afterTomorrowCondition = document.getElementById("afterTomorrowCondition");
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  let userLocation = latitude + `,` + longitude;
  getData(userLocation);
}
getLocation();

async function getData(location) {
  try {
    let url = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=010f2d7c2aa74f5ca1354651241701&q=${location}&days=3`
    );

    if (!url.ok) {
      throw new Error(`HTTP error! Status: ${url.status}`);
    }

    let data = await url.json();
    weatherLocation.innerHTML = data.location.name;
    currentTemperature.innerHTML = `${data.current.temp_c}°C`;
    currentIcon.src = data.current.condition.icon;
    currentCondition.innerHTML = data.current.condition.text;
    humidity.innerHTML = `${data.current.humidity}%`;
    windSpeed.innerHTML = `${data.current.wind_kph}km/h`;
    windDirection.innerHTML = data.current.wind_dir;
    let fullDate = new Date(data.location.localtime);
    currentWeekDay.innerHTML = dayNames[fullDate.getDay()];
    let monthDay = fullDate.getDate();
    let month = fullDate.getMonth();
    currentMonthDay.innerHTML = monthDay + monthNames[month];
    let forcastDate1 = new Date(data.forecast.forecastday[1].date);
    tomorrowDay.innerHTML = dayNames[forcastDate1.getDay()];
    tomorrowIcon.src = data.forecast.forecastday[1].day.condition.icon;
    tomorrowMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    tomorrowMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    tomorrowCondition.innerHTML =
      data.forecast.forecastday[1].day.condition.text;
    let forcastDate2 = new Date(data.forecast.forecastday[2].date);
    afterTomorrowDay.innerHTML = dayNames[forcastDate2.getDay()];
    afterTomorrowIcon.src = data.forecast.forecastday[2].day.condition.icon;
    afterTomorrowMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    afterTomorrowMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    afterTomorrowCondition.innerHTML =
      data.forecast.forecastday[2].day.condition.text;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

findButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  getData(city.value);
});
