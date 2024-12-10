import { apikey } from "./enviroment.js";

async function retrieveData() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=37.961632&lon=-121.275604&appid=${apikey}`
  );
  const data=response.json();
  console.log(data);

}
retrieveData();
