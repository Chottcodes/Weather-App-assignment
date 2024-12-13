import { apikey } from "./Environment.js";

let searchBTN = document.getElementById("searchBTN"),
  searchbox = document.getElementById("searchbox"),
  currentTXT = document.getElementById("main-temp"),
  cityName = document.getElementById("City-name"),
  hightempTxt = document.getElementById("high-Temp"),
  lowtempTxt = document.getElementById("low-Temp"),
  day1 = document.getElementById("day1"),
  day2 = document.getElementById("day2"),
  day3 = document.getElementById("day3"),
  day4 = document.getElementById("day4"),
  day5 = document.getElementById("day5"),
  day1temp = document.getElementById("day1-temp"),
  day2temp = document.getElementById("day2-temp"),
  day3temp = document.getElementById("day3-temp"),
  day4temp = document.getElementById("day4-temp"),
  day5temp = document.getElementById("day5-temp"),
  hazecloudsicon = document.getElementById("weather-icon-haze"),
  cloudyicon = document.getElementById("weather-icon-clouds"),
  moonicon = document.getElementById("weather-icon-moon"),
  rainicon = document.getElementById("weather-icon-rain"),
  snowflakesicon = document.getElementById("weather-icon-snowflake"),
  sunriseicon = document.getElementById("weather-icon-morning"),
  nighticon = document.getElementById("weather-icon-night-clouds"),
  thundericon = document.getElementById("weather-icon-thunder"),
  sunicon = document.getElementById("weather-icon-sun"),
  nightbg = document.getElementById("night-bg"),
  sunnybg = document.getElementById("sunny-trees-bg"),
  rainybg = document.getElementById("rainy-day"),
  parentbgcolor = document.getElementById("main-bg-color"),
  star1 = document.getElementById("star1"),
  star2yellow = document.getElementById("star2-yellow"),
  favorite = document.getElementById("favorite");

let icons = [
  hazecloudsicon,
  cloudyicon,
  moonicon,
  rainicon,
  snowflakesicon,
  sunriseicon,
  nighticon,
  thundericon,
  sunicon,
];
let searchinput = "";

// navigator.geolocation.getCurrentPosition(success);
// function success(position) {
//   const { latitude, longitude } = position.coords;
//   CurrentWeatherByLocation(latitude, longitude);
//   FiveDayFetchByLocation(latitude, longitude);
// }
// async function CurrentWeatherByLocation(lat, lon) {
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`
//   );

//   const data = await response.json();
//   currentTXT.innerText = `${data.main.temp}°F`;
//   cityName.innerText = `${data.name}`;
//   hightempTxt.innerText = `${data.main.temp_max}°F`;
//   lowtempTxt.innerText = `${data.main.temp_min}°F`;
// }

// async function FiveDayFetchByLocation(lat, lon) {
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`
//   );

//   const dataTwo = await response.json();
//   let differentdays = [day1, day2, day3, day4, day5];
//   let daynamearr = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   for (let i = 0; i < 5; i++) {
//     let index = i * 8;
//     let dayname = new Date(dataTwo.list[index].dt_txt);
//     let day = dayname.getDay();
//     differentdays[i].innerText = daynamearr[day];
//   }

//   let fivedaytemp = [day1temp, day2temp, day3temp, day4temp, day5temp];
//   for (let i = 0; i < 5; i++) {
//     let index = i * 8;
//     fivedaytemp[i].innerText = `${dataTwo.list[index].main.temp}°F`;
//   }
// }
searchBTN.addEventListener("click", function () {
  Currentweather();
  fiveDayFetch();
});

async function Currentweather() {
  searchinput = searchbox.value.trim();

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchinput}&appid=${apikey}&units=imperial`
  );

  const data = await response.json();
  currentTXT.innerText = `${data.main.temp}°F`;
  cityName.innerText = `${data.name}`;
  hightempTxt.innerText = `${data.main.temp_max}°F`;
  lowtempTxt.innerText = `${data.main.temp_min}°F`;
  if (data.weather[0].description.toLowerCase().includes("haze")) {
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].id === "weather-icon-haze") {
        icons[i].style.display = "block";
      } else {
        icons[i].style.display = "none";
      }
    }
  }
  if (data.weather[0].description.toLowerCase().includes("snow")) {
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].id === "weather-icon-snowflake") {
        icons[i].style.display = "block";
      } else {
        icons[i].style.display = "none";
      }
    }
  }
  if (
    data.weather[0].description.toLowerCase().includes("rain") ||
    data.weather[0].description.toLowerCase().includes("drizzle")
  ) {
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].id === "weather-icon-rain") {
        icons[i].style.display = "block";
      } else {
        icons[i].style.display = "none";
      }
    }
    rainybg.style.display = "block";
    parentbgcolor.style.backgroundColor = "#0F1014";
    nightbg.style.display = "none";
    sunnybg.style.display = "none";
  }
  if (data.weather[0].description.toLowerCase().includes("thunder")) {
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].id === "weather-icon-thunder") {
        icons[i].style.display = "block";
      } else {
        icons[i].style.display = "none";
      }
    }
    rainybg.style.display = "block";
    parentbgcolor.style.backgroundColor = "#0F1014";
    nightbg.style.display = "none";
    sunnybg.style.display = "none";
  }
  if (
    data.weather[0].description.toLowerCase().includes("clear sky") ||
    data.weather[0].description.toLowerCase().includes("sunny") ||
    data.weather[0].description.toLowerCase() === "few clouds"
  ) {
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].id === "weather-icon-sun") {
        icons[i].style.display = "block";
      } else {
        icons[i].style.display = "none";
      }
    }
    rainybg.style.display = "none";
    parentbgcolor.style.backgroundColor = "#0B200C";
    nightbg.style.display = "none";
    sunnybg.style.display = "block";
  }
  if (data.weather[0].description.toLowerCase().includes("clouds")) {
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].id === "weather-icon-clouds") {
        icons[i].style.display = "block";
      } else {
        icons[i].style.display = "none";
      }
    }
    rainybg.style.display = "block";
    parentbgcolor.style.backgroundColor = "#0F1014";
    nightbg.style.display = "none";
    sunnybg.style.display = "none";
  }
  if (data.dt < data.sys.sunrise) {
    console.log("Night time");
    nightbg.style.display = "block";
    parentbgcolor.style.backgroundColor = "#172433";
    sunnybg.style.display = "none";
    rainybg.style.display = "none";
  }
  if (data.dt > data.sys.sunrise && data.dt < data.sys.sunset) {
    console.log("Day time");
  }
}

async function fiveDayFetch() {
  searchinput = searchbox.value.trim();
  const newreponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${searchinput}&appid=${apikey}&units=imperial`
  );
  const dataTwo = await newreponse.json();
  let differentdays = [day1, day2, day3, day4, day5];
  let daynamearr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let i = 0; i < 5; i++) {
    let index = i * 8;
    let dayname = new Date(dataTwo.list[index].dt_txt);
    let day = dayname.getDay();
    differentdays[i].innerText = daynamearr[day];
  }
  let fivedaytemp = [day1temp, day2temp, day3temp, day4temp, day5temp];
  for (let i = 0; i < 5; i++) {
    let counter = i * 8;
    fivedaytemp[i].innerText = dataTwo.list[counter].main.temp + "°";
  }
  searchbox.value = "";
}
star1.addEventListener("click", changstaricon);
star2yellow.addEventListener("click", yellowicon);
function changstaricon() {
  star1.style.display = "none";
  star2yellow.style.display = "block";
}
function yellowicon() {
  star1.style.display = "block";
  star2yellow.style.display = "none";
}
favorite.addEventListener('click',);