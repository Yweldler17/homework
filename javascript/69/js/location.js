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
    const apiKey = '45f104b299251ab3758428b277ec59c0';
    const location = $('#location');
    const cityName = $('#cityName');
    const zipCode = $('#zipCode');
    const nameOfCity = $('#nameOfCity');
    const weatherDescription = $('#weatherDescription');
    const temperature = $('#temperature');
    const realFeel = $('#realFeel');
    const weatherIcon = $('#weatherIcon');
    const detailsButton = $('#detailsButton');
    const moreDetails = $(`<div id="moreDetails">`);
    const humidityHead = $(`<h3>Humidity</h3>`);
    const pressureHead = $(`<h3>Pressure</h3>`);
    const highTempHead = $(`<h3>High Temp</h3>`);
    const lowTempyHead = $(`<h3>Low Temp</h3>`);
    const humidity = $(`<p id="humidity"></p>`);
    const pressure = $(`<p id="pressure"></p>`);
    const highTemp = $(`<p id="highTemp"></p>`);
    const lowTemp = $(`<p id="lowTemp"></p>`);
    const weatherBox = $('.weatherBox');

    const selectionArray = [location, cityName, zipCode];
    const boxArray = [locationBox, cityBox, zipBox];

    locationBox.append(locationButton);
    cityBox.append(cityButton, cityInputBox, countryInputBox);
    zipBox.append(zipButton, zipInputBox);
    moreDetails.append(humidityHead, humidity, pressureHead, pressure, highTempHead, highTemp, lowTempyHead, lowTemp);
    weatherInfo.append(moreDetails);
    weatherBox.append(locationBox, cityBox, zipBox, weatherInfo);

    locationBox.hide();
    cityBox.hide();
    zipBox.hide();
    weatherInfo.hide();
    moreDetails.hide();

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
                moreDetails.hide();
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
        detailsButton.click(() => {
            setDetails(currentWeather);
        });
    }

    function setDetails(weatherInfo) {
        moreDetails.show();
        humidity.text(`${weatherInfo.main.humidity}`);
        pressure.text(`${weatherInfo.main.pressure}`);
        highTemp.text(`${weatherInfo.main.temp_max.toFixed(0)}° F`);
        lowTemp.text(`${weatherInfo.main.temp_min.toFixed(0)}° F`);
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
        moreDetails.hide();
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