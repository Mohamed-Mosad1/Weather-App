let day = document.querySelector(".day");
let date = document.querySelector(".date");
let weatherLocation = document.querySelector(".location");
let tempNum = document.querySelector(".num");
let weatherImg = document.querySelector(".weatherImg img");
let condition = document.querySelector(".custom");
let iconImg = document.querySelector(".icon img");
let img = document.querySelector(".info span p");
let windKm = document.querySelector("#windKm");
let windDir = document.querySelector("#windDir");
let todayDay = document.querySelector("#today .day");
let todayDate = document.querySelector("#today .date span");
let todayDateMonth = document.querySelector("#today .date p");
// Second day
let maxTemp = document.querySelector(".next-day .maxTemp");
let minTemp = document.querySelector(".minTemp");
let nextDayCondition = document.querySelector("#weatherCondition");
let nextDay = document.querySelector("#tomorrow .day");
// Third day
let weatherImgThird = document.querySelector("#thirdDayIcon");
let maxTempThird = document.querySelector("#maxTemp");
let minTempThird = document.querySelector("#thirdDay .minTemp");
let weatherConditionThird = document.querySelector("#thirdDay .custom");
let thirdDay = document.querySelector("#afrerTomorrow .day");
// search input
let searchInput = document.getElementById("search");

async function getWeather(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4dd67b1d91b043668fa175012231108&q=${city}&days=3`
  );
  let myData = await response.json();
  return myData;
}
function displayTodayWeatherData(weatherApiData) {
  let currentDate = new Date(weatherApiData.forecast.forecastday[0].date);
  weatherLocation.innerHTML = weatherApiData.location.name;
  tempNum.innerHTML = weatherApiData.current.temp_c + "<sup>o</sup> C";
  iconImg.setAttribute("src", weatherApiData.current.condition.icon);
  condition.innerHTML = weatherApiData.current.condition.text;
  img.innerHTML = weatherApiData.current.humidity + "%";
  windKm.innerHTML = weatherApiData.current.wind_kph + "km/h";
  windDir.innerHTML = weatherApiData.current.wind_dir;
  todayDay.innerHTML = currentDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  todayDate.innerHTML = currentDate.getDate();
  todayDateMonth.innerHTML = currentDate.toLocaleDateString("en-us", {
    month: "long",
  });
}
function displaySecondDay(weatherApiData) {
  let currentDate = new Date(weatherApiData.forecast.forecastday[1].date);
  let x = weatherApiData.forecast.forecastday[1];
  weatherImg.setAttribute("src", x.day.condition.icon);
  maxTemp.innerHTML = x.day.maxtemp_c + "<sup>o</sup> C";
  minTemp.innerHTML = x.day.mintemp_c + "<sup>o</sup> C";
  nextDayCondition.innerHTML = x.day.condition.text;
  nextDay.innerHTML = currentDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
}
function displayThirdDay(weatherApiData) {
  let currentDate = new Date(weatherApiData.forecast.forecastday[2].date);
  let x = weatherApiData.forecast.forecastday[2];
  weatherImgThird.setAttribute("src", x.day.condition.icon);
  maxTempThird.innerHTML = x.day.maxtemp_c + "<sup>o</sup> C";
  minTempThird.innerHTML = x.day.mintemp_c + "<sup>o</sup> C";
  weatherConditionThird.innerHTML = x.day.condition.text;
  thirdDay.innerHTML = currentDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
}
async function StartApplication(city = "alexandria") {
  let data = await getWeather(city);
  if (!data.error) {
    displayTodayWeatherData(data);
    displaySecondDay(data);
    displayThirdDay(data);
  }
}
StartApplication();

searchInput.addEventListener("keyup", function () {
  StartApplication(searchInput.value);
});
