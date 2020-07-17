window.myApp = window.myApp || {};

window.myApp.utils = (function (utils) {
    'use strict';

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    utils.getDay = (index) => weekdays[index - 1];
    utils.getIndex = (name) => weekdays.findIndex(elem => elem.toLowerCase() === name.toLowerCase()) + 1;

    return utils;

}(window.myApp.utils || {}));


