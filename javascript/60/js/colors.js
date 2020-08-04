(function () {
    'use strict';

    function getColors() {
        let rndmColors = [];
        for (let i = 0; i < 3; i++) {
            rndmColors.push(Math.random() * 255);
        }
        return rndmColors;
    }

    function getRgb(rgbArray) {
        return 'rgb(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ')';
    }

    function setCss(element, property, value) {
        element.style[property] = value;
    }

    function setColors() {
        setCss(document.body, 'color', getRgb(getColors()));
        setCss(document.body, 'backgroundColor', getRgb(getColors()));
    }

    const manualChange = document.getElementById('theButton');
    const autoChange = document.getElementById('theButton2');

    let intervalId;

    manualChange.addEventListener('click', () => setColors());
    autoChange.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            autoChange.innerHTML = 'Start Auto Change';
        } else {
            intervalId = setInterval(setColors, 300);
            autoChange.innerHTML = 'Stop Auto Change';
        }
    });

}());

