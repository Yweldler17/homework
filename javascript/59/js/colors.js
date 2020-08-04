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

    manualChange.addEventListener('click', () => setColors());
    autoChange.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            autoChange.innerHTML = 'Start';
        } else {
            intervalId = setInterval(setColors(), 1000);
            autoChange.innerHTML = 'Stop';
        }
    });

    let intervalId;

    startButton.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            startButton.innerHTML = 'Start';
        } else {
            intervalId = setInterval(moveTheButton, 100);
            startButton.innerHTML = 'Stop';
        }
    });

}());

