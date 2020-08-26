(function () {
    'use strict';

    let intervalId;

    function getColors() {
        let rndmColors = [];
        for (let i = 0; i < 3; i++) {
            rndmColors.push(Math.floor(Math.random() * 255));
        }
        return rndmColors;
    }

    function getRgb(rgbArray) {
        return 'rgb(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ')';
    }

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(element, property, value) {
        element.style[property] = value;
    }

    function setColors() {
        let color1 = getRgb(getColors());
        let color2 = getRgb(getColors());
        setCss(document.body, 'color', color1);
        setCss(document.body, 'backgroundColor', color2);
        addColorsInfo(color1, color2);
    }

    const manualChange = get('theButton');
    const autoChange = get('theButton2');

    manualChange.addEventListener('click', () => setColors());
    autoChange.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            autoChange.innerHTML = 'Start Auto Color Change';
        } else {
            intervalId = setInterval(setColors, 500);
            autoChange.innerHTML = 'Stop Auto Color Change';
        }
    });

    function addColorsInfo(textColor, bgColor) {
        const colorsTable = get('colors');
        const newRow = colorsTable.insertRow();
        const timeCell = newRow.insertCell();
        const textColorCell = newRow.insertCell();
        const bgColorCell = newRow.insertCell();
        const now = new Date();
        timeCell.innerHTML = now.toLocaleString();
        textColorCell.innerHTML = textColor;
        bgColorCell.innerHTML = bgColor;
        newRow.addEventListener('click', () => {
            setCss(newRow, 'color', textColor);
            setCss(newRow, 'backgroundColor', bgColor);
        });
    }

}());

