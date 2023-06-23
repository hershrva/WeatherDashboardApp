var searchCityBtn = document.querySelector('#search-city-btn');
var cityInputEl = document.querySelector('#input-city');
var citySearchHistory = document.querySelector('#search-history');

searchCity(e) {
    e.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        console.log(city);

        retrieveCityCoords(city);
        cityInputEl.value = city;
    } else {
        alert('Please enter a City');
    }
}


retrieveCityCoords(){
    var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city +'&limit=1&appid=8f1de359fa41d7b4bc7e9e43ab2ec203';

    fetch(geoApiUrl)
        .then(function (respons){
            if (response.ok) {
                console.log(response);

                response.json().then(function (data) {
                    saveSearch(data.name, lat, lon)
                    retrieveCityWeather();
                });
            }else{
                console.log(response);

                alert('Error: ' + response.statusText);
            }    
        })
        .catch(function (error) {
            alert('Unable to retrieve City information');
            console.log(alert);
        });
    };
};

saveSearch() {

}

retrieveCityWeather(){
    
}

printFiveDay(){

}

searchCityBtn.addEventListener('click', searchCity);