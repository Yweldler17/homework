window.app = (function (myCounter) {
    'use strict';
    let numOfCounters = 0;

    myCounter.createCounter = {
        getCounter: function () {
            numOfCounters++;
            return {
                counter: 0,
                addOne: function () {
                    this.counter++;
                },
                getCount: function () {
                    return this.counter;
                },
                getNumOfCounters: function () {
                    return numOfCounters;
                }
            };
        }
    };
    return myCounter;

}(window.app || {}));
