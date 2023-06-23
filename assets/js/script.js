var searchCityBtn = document.querySelector('#search-city-btn');
var cityInputEl = document.querySelector('#input-city');
var citySearchHistory = document.querySelector('#search-history');
var city = '';
var lat;
var lon;
var apiKey = '8f1de359fa41d7b4bc7e9e43ab2ec203';

function searchCity(e) {
    e.preventDefault();

    city = cityInputEl.value.trim();

    if (city) {
        console.log(city);

        retrieveCityCoords();
        cityInputEl.value = city;
    } else {
        alert('Please enter a City');
    }
}

function retrieveCityCoords() {
    var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(geoApiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);

                response.json().then(function (data) {
                    console.log(data);

                    lat = data[0].lat;
                    lon = data[0].lon;
                    saveSearch(data[0].name, lat, lon);
                    console.log(data[0].name, lat, lon);
                    retrieveCityWeather(lat, lon);
                });
            } else {
                console.log(response);

                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to retrieve City Weather information');
            console.log(error);
        });
}

function saveSearch(city, lat, lon) {
   
}

function printSearchHistory() {

}

function retrieveCityWeather(lat, lon){
    var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

    fetch(weatherApiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);

                response.json().then(function (data) {
                    console.log(data);

                });
            } else {
                console.log(response);

                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to retrieve City information');
            console.log(error);
        });
}

function printFiveDay(){

}

searchCityBtn.addEventListener('click', searchCity);