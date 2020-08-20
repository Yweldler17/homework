// SL - fine - but to my eye taking in top level "app" object as "myCounter" and then inside doing myCounter.counter = ...
// looks a little more confusing then either taking in window.app.counter or just doing assignment of result of IIFE
// to window.app.counter
// This way may be a line less of code though...
window.app = (function (myCounter) {
    'use strict';

    let myNum = 0;

    myCounter.counter = {
        addOne: function () {
            myNum++;
        },
        getCount: () => myNum
    };

    return myCounter;

}(window.app || {}));

