(function () {
    'use strict';

    function Vehicle(colorChoice) {
        this.color = colorChoice;
        this.speed = 0;
    }

    Vehicle.prototype.go = function (speed) {
        this.speed = speed;
        console.log(`This vehicle is now moving at ${this.speed} MPH`);
    };

    Vehicle.prototype.print = function () {
        console.log(`This vehicle is ${this.color} and is traveling at ${this.speed} MPH`);
    };

    function Plane(colorChoice) {
        this.color = colorChoice;
        this.speed = 0;
    }

    Plane.prototype = Object.create(Vehicle.prototype);
    Plane.prototype.print = function () {
        console.log(`This vehicle is ${this.color} and is flying at ${this.speed} MPH`);
    };

    const myCar = new Vehicle('Blue');
    console.log(myCar);
    myCar.print();
    myCar.go(100);
    console.log(myCar);

    const myPlane = new Plane('Orange');
    console.log(myPlane);
    myPlane.go(100);
    myPlane.print();
    myCar.print();
    console.log(myPlane);
    console.log(myCar);

}());


