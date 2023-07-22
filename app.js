const apiKey = 'f07b59eaaf50dde46d031e69a47545c3';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")

function activateWeather() {
    document.querySelector(".weather").style.display = "block";
}

async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    var data = await response.json();

    if(response.status == 404){
        document.querySelector(".error").style.display = 'block';
    }
    else {
        document.querySelector(".error").style.display = 'none';
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.ceil(data.main.temp) + '°F';
        document.querySelector('.humidity').innerHTML = Math.ceil(data.main.humidity) + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'm/s';

        try {
            document.querySelector('.weather-icon').src = "images/" + data.weather[0].main + ".png";
        }
        catch(err){
            document.querySelector('.weather-icon').src = "images/clouds.png"
            console.log("Undefined weather type")
        }

        activateWeather()
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})