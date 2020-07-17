window.myApp = window.myApp || {};

window.myApp.utils = (function (utils) {
    'use strict';

    utils.stringCaseInsensitiveEquals = (text1, text2) => text1.toLowerCase() === text2.toLowerCase();

    return utils;

}(window.myApp.utils || {}));
