(function () {

    'use strict';
    class Vehicle {

        constructor(color) {
            this.color = color;
            this.speed = 0;
        }
        go(speed) {
            this.speed = speed;
            console.log(`Now traveling at ${this.speed} MPH`);
        }
        print() {
            console.log(`This ${this.color} vehicle is traveling at ${this.speed} MPH`);
        }
    }

    class Plane extends Vehicle {

        go(speed) {
            this.speed = speed;
            console.log(`Now flying at ${this.speed} MPH`);
        }
    }

    const car1 = new Vehicle('Blue');
    car1.print();
    car1.go(120);

    console.log(car1);

    const plane1 = new Plane('Green');
    plane1.go(450);
    console.log(plane1);


}());


