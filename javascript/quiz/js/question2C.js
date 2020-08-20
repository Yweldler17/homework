// SL - 100 - Nice!

(function () {
    'use strict';

    for (let i = 0; i < 10; i++) {
        window.app.counter.addOne();
    }

    const counter1 = window.app.createCounter();
    const counter2 = window.app.createCounter();

    for (let i = 0; i < 5; i++) {
        counter1.addOne();
    }

    for (let i = 0; i < 15; i++) {
        counter2.addOne();
    }

    console.log(window.app.counter.getCount());
    console.log(counter1.getCount());
    console.log(counter2.getCount());

}());





