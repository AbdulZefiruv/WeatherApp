const apikey = "57100e7bae8127e1269eac21571fd294";

const weatherDataElement = document.getElementById ("weather-data");
const cityInputElement = document.getElementById ("city-input");
const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputElement.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric&lang=ru`)

        if(!response.ok){
            throw new Error("Network respone was not ok")
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description

        const icon = data.weather[0].icon

        const details  = [
            `Ощущается как: ${Math.round(data.main.feels_like)}°С`,
            `Влажность: ${data.main.humidity}%`,
            `Скорость ветра: ${data.wind.speed} M/с`
        ]

        weatherDataElement.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataElement.querySelector(".temperature").textContent = `${temperature}°С`;
        weatherDataElement.querySelector(".description").textContent = `${description}`;
        weatherDataElement.querySelector(".details").innerHTML = details.map(
            (details) =>
                 `<div>${details}</div>`
        ).join("");

    } catch (error) {
        console.error(error);
    }
}