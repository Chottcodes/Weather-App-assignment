import { apikey } from "../scripts/enviroment.js";

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
  day5temp = document.getElementById("day5-temp");
let searchinput = "";

// navigator.geolocation.getCurrentPosition(success);
// function success(position){
//     const { latitude, longitude } = position.coords;
//     CurrentWeatherByLocation(latitude, longitude);
//     FiveDayFetchByLocation(latitude, longitude);
    
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
}
async function fiveDayFetch() {
  searchinput = searchbox.value.trim();
  const newreponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${searchinput}&appid=${apikey}&units=imperial`
  );
  const dataTwo = await newreponse.json();
  searchbox = "";
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
    fivedaytemp[i].innerText = dataTwo.list[counter].main.temp;
  }
  searchinput = "";
}