window.yWeldUtils = window.yWeldUtils || {};
window.yWeldUtils.clock = (function () {
    'use strict';

    let d = new Date();
    let hours = fixHours(d.getHours());
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let intervalId;

    function fixHours(hours) {
        if (hours > 12) {
            hours -= 12;
        }
        return hours;
    }

    const time = document.createElement('p');

    time.style.padding = '2em';
    time.style.fontWeight = 'bolder';
    time.style.fontSize = '3em';
    time.style.position = 'absolute';
    time.style.bottom = '0';
    time.style.right = '0';
    time.style.color = 'black';
    time.style.margin = '0';
    time.innerHTML = '00:00:00';
    document.body.appendChild(time);

    intervalId = setInterval(startClock, 1000);

    function startClock() {
        seconds += 1;
        if (seconds > 59) {
            seconds = 0;

            minutes += 1;
            if (minutes > 59) {
                minutes = 0;

                hours += 1;
                if (hours > 12) {
                    hours = 0;
                }
            }
        }
        time.innerHTML = `${hours}:` + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }

}());