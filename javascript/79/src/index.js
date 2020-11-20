import $ from 'jquery';

(function () {

    /*global $ */

    "use strict";

    const gameboard = $('#gameboard');
    const canvas = document.getElementById('cars');
    const context = canvas.getContext('2d');
    const SQUARE_LENGTH = 50;

    // class Tiles {
    //     constructor(row, column) {
    //         this.row = row;
    //         this.column = column;
    //         this.htmlTag = `<div id="boardSquare"></div>`;
    //     }
    // }

    class Vehicle {
        constructor(image, length, width, alignment, x, y) {
            this.image = image;
            this.length = length;
            this.width = width;
            this.alignemnt = alignment;
            this.x = x;
            this.y = y;
        }

        moveVehicle(direction) {

            switch (direction) {
                case 'ArrowLeft':
                    if (this.x > 0) {
                        this.x -= SQUARE_LENGTH;
                    }
                    break;
                case 'ArrowRight':
                    if ((this.x + this.length) < canvas.width) {
                        this.x += SQUARE_LENGTH;
                    }
                    break;
            }
            drawBoard(this);
        }
    }

    function setUpBoard() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                gameboard.append(`<div class="boardSquare"></div>`);
            }
        }
    }

    function drawBoard(car) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(car.image, car.x, car.y, car.length, car.width);
        console.log(car);

    }

    const blueCar = new Image();
    blueCar.src = 'images/blueCar2.png';

    blueCar.addEventListener('load', () => {
        let myCar = new Vehicle(blueCar, 100, 25, 'vertical', 0, 0);
        drawBoard(myCar);
        document.addEventListener('keydown', e => {

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                    myCar.moveVehicle(e.key);
            }
        });
    });






    setUpBoard();

}());