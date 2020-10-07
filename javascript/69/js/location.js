(function () {
    'use strict';

    /*global $ */

    const locationBox = $(`<div id="locationBox"></div>`);
    const cityBox = $(`<div id="cityBox"></div>`);
    const zipBox = $(`<div id="zipBox"></div>`);
    const locationButton = $('<button id="locationButton">My Weather</button>');
    const cityButton = $('<button id="cityButton">By City Name</button>');
    const zipButton = $('<button id="zipButton">By Zip Code</button>');
    const weatherInfo = $('#weatherInfo');
    const cityInputBox = $('<input id="cityInputBox" value="" />');
    const countryInputBox = $('<input id="countryInputBox" value="US" />');
    const zipInputBox = $('<input id="zipInputBox" value="" />');

    const location = $('#location');
    const cityName = $('#cityName');
    const zipCode = $('#zipCode');
    const nameOfCity = $('#nameOfCity');
    const weatherDescription = $('#weatherDescription');
    const temperature = $('#temperature');
    const realFeel = $('#realFeel');
    const weatherIcon = $('#weatherIcon');
    const selectionArray = [location, cityName, zipCode];
    const boxArray = [locationBox, cityBox, zipBox];
    //const selectionBar = $('.selectionBar');
    const weatherBox = $('.weatherBox');

    locationBox.append(locationButton);
    cityBox.append(cityButton);
    cityBox.append(cityInputBox);
    cityBox.append(countryInputBox);
    zipBox.append(zipButton);
    zipBox.append(zipInputBox);
    weatherBox.append(locationBox);
    weatherBox.append(cityBox);
    weatherBox.append(zipBox);
    weatherBox.append(weatherInfo);

    locationBox.hide();
    cityBox.hide();
    zipBox.hide();
    weatherInfo.hide();

    let lat;
    let lon;
    let unitChoice;

    selectionArray.forEach(tab => {
        tab.click((e) => {
            setSelected(e.target);
        });
    });

    locationButton.click(() => {
        navigator.geolocation.getCurrentPosition(showPosition);
    });

    cityButton.click(() => {
        getWeather(`q=${cityInputBox.val()}, ${countryInputBox.val()}`);
        console.log(`q=${cityInputBox.val()}, ${countryInputBox.val()}`);
    });

    zipButton.click(() => {
        getWeather(`zip=${zipInputBox.val()}`);
    });

    function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        getWeather(`lat=${lat}&lon=${lon}`);
    }

    function getWeather(locationString) {

        fetch(`https://api.openweathermap.org/data/2.5/weather?${locationString}&units=${unitChoice || 'imperial'}&appid=${apiKey}`)
            .then(r => {
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                return r.json();
            })
            .then(weatherData => {
                console.log(weatherData);
                setWeatherInfo(weatherData);
                //let locationLat = weatherData.coord.lat;
                //let locationLon = weatherData.coord.lon;
            })
            .catch(err => console.log(err));
    }

    function setWeatherInfo(currentWeather) {
        weatherInfo.show();
        nameOfCity.text(`${currentWeather.name} Weather`);
        weatherDescription.text(`${currentWeather.weather[0].description}`);
        temperature.text(`${currentWeather.main.temp.toFixed(0)}° F`);
        realFeel.text(`${currentWeather.main.feels_like.toFixed(0)}° F`);
        weatherIcon.attr('src', `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`);
    }

    function setSelected(choice) {
        for (let i = 0; i < selectionArray.length; i++) {
            if (selectionArray[i][0].id === choice.id) {
                if (selectionArray[i].hasClass('selectedTab')) {
                    selectionArray[i].removeClass('selectedTab');
                    setBox();
                } else {
                    selectionArray[i].addClass('selectedTab');
                    setBox(boxArray[i]);
                }
            } else {
                selectionArray[i].removeClass('selectedTab');
            }
        }
        weatherInfo.hide();
    }

    function setBox(box) {
        boxArray.forEach(element => {
            if (box === element) {
                box.show();
            } else {
                element.hide();
            }
        });
        nameOfCity.empty();
        temperature.empty();
        weatherDescription.empty();
        cityInputBox.val('');
        zipInputBox.val('');
    }


}());