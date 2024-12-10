import { apikey } from "./enviroment.js";

async function retrieveData() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=37.961632&lon=-121.275604&appid=${apikey}&units=imperial`
  );
  const data=await response.json();
  console.log(`The current temp in stockton is ${data.main.temp}°F`);
  console.log(`The High: ${data.main.temp_max}°F`);
  console.log(`The Low: ${data.main.temp_min}°F`);
  

}
retrieveData();
