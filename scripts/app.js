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
  weatherIcon = document.getElementById("weather-icons"),
  mainbg = document.getElementById("background"),
  parentbgcolor = document.getElementById("main-bg-color"),
  star1clear = document.getElementById("star1-clear"),
  star2yellow = document.getElementById("star2-yellow"),
  favorite = document.getElementById("favorite"),
  favoritelist = document.getElementById("favorite-list"),
  cancelitemicon = document.getElementById("cancel-item-icon"),
  favoriteswindowcloseBTN = document.getElementById("cancelBTN"),
  escapecontainer = document.getElementById("e-container"),
  inputcontainer = document.getElementById("input-div"),
  rightcontainer1 = document.getElementById("right-container-1"),
  rightcontainer2 = document.getElementById("right-container-2");
const originalDisplay = getComputedStyle(inputcontainer).display;
const originalDisplay1 = getComputedStyle(escapecontainer).display;
let searchinput = "";

favoriteswindowcloseBTN.addEventListener("click", function () {
  escapecontainer.style.display = "none";
  if ((inputcontainer.style.display = "none")) {
    inputcontainer.style.display = originalDisplay;
  } else {
    inputcontainer.style.display = "none";
  }
  rightcontainer1.style.display = "block";
  rightcontainer2.style.display = "none";
});
favorite.addEventListener("click", function () {
  rightcontainer1.style.display = "none";
  inputcontainer.style.display = "none";
  rightcontainer2.style.display = "block";
  escapecontainer.style.display = "block";
});

navigator.geolocation.getCurrentPosition(success);

function success(position) {
  const { latitude, longitude } = position.coords;
  CurrentWeatherByLocation(latitude, longitude);
  FiveDayFetchByLocation(latitude, longitude);
}
async function CurrentWeatherByLocation(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`
  );

  const data = await response.json();
  currentTXT.innerText = `${Math.round(data.main.temp)}°F`;
  cityName.innerText = `${data.name}`;
  hightempTxt.innerText = `${Math.round(data.main.temp_max)}°F`;
  lowtempTxt.innerText = `${Math.round(data.main.temp_min)}°F`;
  let weatherDescription = data.weather[0].description.toLowerCase();
  let datetime = data.dt;
  let sunrisetime = data.sys.sunrise;
  let sunset = data.sys.sunset;

  switch (true) {
    case weatherDescription.includes("haze"):
      weatherIcon.src = "Assests/haze.png";
      break;
    case weatherDescription.includes("snow"):
      weatherIcon.src = "Assests/snowflake.png";
      mainbg.src = "Assests/snowbg.jpg";
      break;
    case weatherDescription.includes("rain") ||
      weatherDescription.includes("drizzle"):
      weatherIcon.src = "Assests/heavy-rain.png";
      mainbg.src = "Assests/rainybg.jpg";
      parentbgcolor.style.backgroundColor = "#0F1014";
      break;
    case weatherDescription.includes("thunder"):
      weatherIcon.src = "Assests/thunder.png";
      mainbg.src = "Assests/thunderbg.jpg";
      parentbgcolor.style.backgroundColor = "#0F1014";
      break;
    case weatherDescription.includes("clear sky") ||
      weatherDescription.includes("sunny") ||
      weatherDescription === "few clouds":
      weatherIcon.src = "Assests/sun.png";
      mainbg.src = "Assests/sunnybg.jpg";
      parentbgcolor.style.backgroundColor = "#0B200C";
      break;
    case weatherDescription.includes("clouds") ||
      weatherDescription.includes("mist"):
      weatherIcon.src = "Assests/cloud.png";
      mainbg.src = "Assests/rainybg.jpg";
      parentbgcolor.style.backgroundColor = "#0F1014";
      break;
    default:
      break;
  }

  if (datetime < sunrisetime) {
    console.log("Night time");
    weatherIcon.src = "Assests/full-moon.png";
    mainbg.src = "Assests/nightbg.jpg";
    parentbgcolor.style.backgroundColor = "#172433";
  } else if (datetime > sunrisetime && datetime < sunset) {
    console.log("Day time");
  }
}

async function FiveDayFetchByLocation(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`
  );

  const dataTwo = await response.json();
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
    fivedaytemp[i].innerText =
      Math.round(dataTwo.list[counter].main.temp) + "°";
  }
}
searchBTN.addEventListener("click", function () {
  Currentweather();
  fiveDayFetch();
});

async function Currentweather() {
  searchinput = searchbox.value.trim();

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchinput}&appid=${apikey}&units=imperial`
  );

  localStorage.setItem("lastSearchedCity", searchinput);

  const data = await response.json();
  currentTXT.innerText = `${Math.round(data.main.temp)}°F`;
  cityName.innerText = `${data.name}`;
  hightempTxt.innerText = `${Math.round(data.main.temp_max)}°F`;
  lowtempTxt.innerText = `${Math.round(data.main.temp_min)}°F`;
  let weatherDescription = data.weather[0].description.toLowerCase();
  let datetime = data.dt;
  let sunrisetime = data.sys.sunrise;
  let sunset = data.sys.sunset;

  switch (true) {
    case weatherDescription.includes("haze"):
      weatherIcon.src = "Assests/haze.png";
      break;

    case weatherDescription.includes("snow"):
      weatherIcon.src = "Assests/snowflake.png";
      mainbg.src = "Assests/snowbg.jpg";
      break;

    case weatherDescription.includes("rain") ||
      weatherDescription.includes("drizzle"):
      weatherIcon.src = "Assests/heavy-rain.png";
      mainbg.src = "Assests/rainybg.jpg";
      parentbgcolor.style.backgroundColor = "#0F1014";
      break;

    case weatherDescription.includes("thunder"):
      weatherIcon.src = "Assests/thunder.png";
      weatherIcon.src = "Assests/sun.png";
      mainbg.src = "Assests/thunderbg.jpg";
      parentbgcolor.style.backgroundColor = "#0F1014";

      break;

    case weatherDescription.includes("clear sky") ||
      weatherDescription.includes("sunny") ||
      weatherDescription === "few clouds":
      weatherIcon.src = "Assests/sun.png";
      mainbg.src = "Assests/sunnybg.jpg";
      parentbgcolor.style.backgroundColor = "#0B200C";
      break;

    case weatherDescription.includes("clouds") ||
      weatherDescription.includes("mist"):
      weatherIcon.src = "Assests/cloud.png";
      mainbg.src = "Assests/rainybg.jpg";
      parentbgcolor.style.backgroundColor = "#0F1014";
      break;

    default:
      break;
  }

  if (datetime > sunset) {
    console.log("Night time");
    weatherIcon.src = "Assests/full-moon.png";
    mainbg.src = "Assests/nightbg.jpg";
    parentbgcolor.style.backgroundColor = "#172433";
  } else if (datetime > sunrisetime && datetime < sunset) {
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

    fivedaytemp[i].innerText =
      Math.round(dataTwo.list[counter].main.temp) + "°";
  }
  searchbox.value = "";
}

star1clear.addEventListener("click", changstaricon);
star2yellow.addEventListener("click", yellowicon);

function changstaricon() {
  let listcontent = document.createElement("li");
  let image = document.createElement("img");
  let city = cityName.innerText.trim();
  star1clear.style.display = "none";
  star2yellow.style.display = "block";
  image.src = "/Assests/cancel.png";
  image.alt = "Cancel icon";
  image.id = "cancel-item-icon";
  listcontent.innerText = city;
  listcontent.appendChild(image);

  favoritelist.appendChild(listcontent);

  addToLocalStorage(city);

  image.addEventListener("click", function () {
    removeitem(city);
    listcontent.remove();
  });
}

function yellowicon() {
  star1clear.style.display = "block";
  star2yellow.style.display = "none";
}

function addToLocalStorage(city) {
  let localfav = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!localfav.includes(city)) {
    localfav.push(city);
  }
  localStorage.setItem("favorites", JSON.stringify(localfav));
}

function loadFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favoritelist.innerHTML = "";

  favorites.forEach((city) => {
    let listcontent = document.createElement("li");
    let image = document.createElement("img");

    image.src = "/Assests/cancel.png";
    image.alt = "Cancel icon";

    listcontent.innerText = city;
    listcontent.appendChild(image);

    listcontent.addEventListener("click", function () {
      searchbox.value = city;
      Currentweather();
      fiveDayFetch();
    });

    image.addEventListener("click", function () {
      removeitem(city);
      listcontent.remove();
    });

    favoritelist.appendChild(listcontent);
  });
}

function removeitem(city) {
  let localfav = JSON.parse(localStorage.getItem("favorites")) || [];

  let nameIndex = localfav.indexOf(city);

  if (nameIndex !== -1) {
    localfav.splice(nameIndex, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(localfav));
}

window.onload = function () {
  loadFavorites();
  const lastSearchedCity = localStorage.getItem("lastSearchedCity");
  if (lastSearchedCity) {
    searchbox.value = lastSearchedCity;
    Currentweather();
  }
};
