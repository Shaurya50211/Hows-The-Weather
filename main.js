
const api = {
    key: "API_KEY",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
        searchbox.value = ""
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather)  
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`  

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weather_el = document.querySelector(`.current .weather`)
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(`.hi-low`)
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return `${day} ${date} ${month} ${year} ${strTime}`
}