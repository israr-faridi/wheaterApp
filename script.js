let input = document.querySelector('input');
let box = document.querySelector('.box')
let search = document.querySelector('.search');
let locations = document.querySelector('.location');
let img = document.querySelector('.weather');
let degree = document.querySelector('.degree_city h1');
let city = document.querySelector('.degree_city h2');
let wind = document.querySelector('.wind');
let hum = document.querySelector('.humidity');
let body = document.querySelector('body');


// const apiKey = "";
// const apiUrl = "";

// async function checkWeather() {
//     const response = await fetch(apiUrl + `&appid=${apiKey}`);
//     const data = await response.json();
// }
const api_key = '7bc37fd647675feb4ba0e4fa033b1409';

function fetchData() {

    let url = ` https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${api_key}`

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            showData(data)
        })
        .catch((err) => {
            box.innerHTML = `<img class='error' src="/asset/imgs/not-found.png"/>`
            console.log(err)
        })

    input.value = '';

}


search.addEventListener('click', fetchData)
input.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        fetchData()
    }
})



function showData(data) {
    
    const { country } = data.sys
    const { temp, humidity } = data.main
    const { speed } = data.wind
    const { id } = data.weather[0]



    if (id >= 200 && id <= 232) {
        img.src = './asset/imgs/thunderstorms.png'
        body.className += ' bg thunderstorms'
    }
    else if (id >= 300 && id <= 321) {
        img.src = './asset/imgs/drizzle.png'
        body.className += ' bg drizzle'
    }
    else if (id >= 500 && id <= 531) {
        img.src = './asset/imgs/rain.png'
        body.className += ' bg rain'
    } else if (id >= 600 && id <= 622) {
        img.src = './asset/imgs/snow.png'
        body.className += ' bg snow'
    } else if (id >= 701 && id <= 781) {
        img.src = './asset/imgs/cloudy.png'
        body.className += ' bg cloudy'

    } else if (id >= 801 && id <= 804) {
        img.src = './asset/imgs/clouds.png'
        body.className += ' bg clouds'
    }
    else {
        img.src = './asset/imgs/sun.png'
        body.className += ' bg sun'

    }



    city.innerHTML = data.name + ',' + country
    degree.innerHTML = Math.round(temp) + `<sup>o</sup>c`
    wind.innerHTML = speed + "km/h"
    hum.innerHTML = humidity + "%"
    console.log(data)

}