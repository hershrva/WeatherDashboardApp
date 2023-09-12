var searchCityBtn = document.querySelector('#search-city-btn');
var cityInputEl = document.querySelector('#input-city');
var searchHistoryEl = document.querySelector('#search-history');
var city = '';
var lat;
var lon;
var apiKey = '8f1de359fa41d7b4bc7e9e43ab2ec203';

function searchCity(e) {
  e.preventDefault();

  city = cityInputEl.value.trim();

  if (city) {
    console.log(city);

    retrieveCityCoords(city);
    cityInputEl.value = city;
  } else {
    alert('Please enter a City');
  }
}

function retrieveCityCoords(city) {
  var geoApiUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    city +
    '&limit=1&appid=' +
    apiKey;

  fetch(geoApiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);

        response.json().then(function (data) {
          console.log(data);

          lat = data[0].lat;
          lon = data[0].lon;
          saveSearch(city);
          console.log(data[0].name, lat, lon);
          retrieveWeather(lat, lon);
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

function saveSearch(search) {
    console.log(search);

    var searches = readSearchesFromStorage();
    searches.push(search);
    localStorage.setItem('searches', JSON.stringify(searches));
    printSearchHistory();
}

function readSearchesFromStorage() {
    var searches = localStorage.getItem('searches');
    if (searches) {
        searches = JSON.parse(searches);
    } else {
        searches = [];
    }
    return searches;
}

function printSearchHistory() {
    searchHistoryEl.innerHTML = '';

    var searches = readSearchesFromStorage();

    for (var i = 0; i < searches.length; i++) {
        var search = searches[i];
        var searchCityEl = document.createElement('button');
        searchCityEl.setAttribute('type', 'button');
        searchCityEl.classList.add('btn', 'mt-3', 'w-100', 'hist-btn');
        searchCityEl.setAttribute('id', search);
        searchCityEl.textContent = search;
        searchHistoryEl.appendChild(searchCityEl);
    }
}

printSearchHistory();

function retrieveWeather(lat, lon) {
    var weatherApiUrl =
        'https://api.openweathermap.org/data/2.5/forecast?lat=' +
        lat +
        '&lon=' +
        lon +
        '&appid=' +
        apiKey;

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