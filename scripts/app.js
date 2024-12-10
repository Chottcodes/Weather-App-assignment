import { apikey } from "./enviroment.js";

async function retrieveData() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=37.961632&lon=-121.275604&appid=${apikey}&units=imperial`
  );

  const data = await response.json();
  console.log(`The current temp in stockton is ${data.main.temp}°F`);
  console.log(`The High: ${data.main.temp_max}°F`);
  console.log(`The Low: ${data.main.temp_min}°F`);

}
async function fiveDayFetch(){
    const newreponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=37.9577&lon=121.2908&appid=${apikey}&units=imperial`
      );
      const dataTwo = await newreponse.json();
      console.log(dataTwo.list[0].main.temp);
      console.log(dataTwo.list[6].main.temp);
      console.log(dataTwo.list[14].main.temp);
      console.log(dataTwo.list[22].main.temp);
      console.log(dataTwo.list[30].main.temp);
}
retrieveData();
fiveDayFetch();
