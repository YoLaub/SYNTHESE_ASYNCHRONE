// const GEOCODING = "https://geocoding-api.open-meteo.com/v1/search?name={Berlin}&count=10&language=en&format=json";

var form = document.querySelector("#weatherForm");
var context = document.querySelector("#weatherChart");

var weather_chart;

form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const formData = new FormData(form);
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const hourly = formData.get("hourly");
    const forecastDays = formData.get("forecast_days");


    const WEATHER = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${hourly}&forecast_days=${forecastDays}`;;

    const response = await fetch(WEATHER);
    const data = await response.json();

    console.log(data)

})

