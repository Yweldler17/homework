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

