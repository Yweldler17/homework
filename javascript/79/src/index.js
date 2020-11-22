import './css/index.css';
import $ from 'jquery';

const gameboard = $('#gameboard');
const topBoard = $('#topBoard');
let SQUARE_SIZE = topBoard.width() / 6;
let cars = [];
let currentCar;

const blueCar = $(`<img src="images/blueCar2.png" class="cars" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="Blue Car">`);
const greenCar = $(`<img src="images/greenCar.png" class="cars" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="Green Car">`);
const redCar = $(`<img src="images/redCar.png" class="cars" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="Red Car">`);
const purpleCar = $(`<img src="images/purpleCar.png" class="cars" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="Purple Car">`);
const orangeCar = $(`<img src="images/orangeCar.png" class="cars" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="Orange Car">`);
const grayTruck = $(`<img src="images/grayTruck.png" class="cars" width="${SQUARE_SIZE}" height="${SQUARE_SIZE * 3}" alt="Gray Truck">`);
const orangeTruck = $(`<img src="images/orangeTruck.png" class="cars" width="${SQUARE_SIZE}" height="${SQUARE_SIZE * 3}" alt="Orange Truck">`);
const yellowTruck = $(`<img src="images/yellowTruck.png" class="cars" width="${SQUARE_SIZE}" height="${SQUARE_SIZE * 3}" alt="Yellow Truck">`);
const lightGreenCar = $(`<img src="images/lightGreenCar.png" class="cars" width="${SQUARE_SIZE}" height="${SQUARE_SIZE * 2}" alt="Light Green Car">`);
const road = $(`<img src="images/road.png" class="cars" id="road" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="road">`);


function resizeboard() {
    SQUARE_SIZE = topBoard.width() / 6;
    cars.forEach((car) => {
        if (car.squares.length > 2) {
            switch (car.alignemnt) {
                case 'vertical':
                    car.image.css({ width: SQUARE_SIZE * 3, height: SQUARE_SIZE });
                    break;
                case 'horizontal':
                    car.image.css({ width: SQUARE_SIZE, height: SQUARE_SIZE * 3 });
                    break;
            }
        } else {
            switch (car.alignemnt) {
                case 'vertical':
                    car.image.css({ width: SQUARE_SIZE * 2, height: SQUARE_SIZE });
                    break;
                case 'horizontal':
                    car.image.css({ width: SQUARE_SIZE, height: SQUARE_SIZE * 2 });
                    break;
            }
        }
        drawBoard(car);
        road.css({ width: SQUARE_SIZE * 2, height: SQUARE_SIZE, top: 2 * SQUARE_SIZE, left: 6 * SQUARE_SIZE });
    });
}
window.addEventListener('resize', resizeboard);
resizeboard();

class Vehicle {
    constructor(image, alignment, squares, redCar) {
        this.image = image;
        this.alignemnt = alignment;
        this.squares = squares;
        this.redCar = redCar;
    }

    moveVehicle(direction) {
        let frontSquare = this.squares.length - 1;
        let spotTaken = false;
        if (currentCar === this) {
            switch (direction) {
                case 'ArrowLeft':
                    if (this.squares[0].col > 0 && this.alignemnt === 'vertical') {
                        spotTaken = checkForCars(this.squares[0].row, this.squares[0].col - 1);
                        if (!spotTaken) {
                            this.squares.forEach((square) => {
                                square.col--;
                            });
                        }
                    }
                    break;
                case 'ArrowRight':

                    if ((this.squares[frontSquare].col < 5 || this.squares[frontSquare].row === 2) && this.alignemnt === 'vertical') {
                        spotTaken = checkForCars(this.squares[frontSquare].row, this.squares[frontSquare].col + 1);
                        if (!spotTaken) {
                            this.squares.forEach((square) => {
                                square.col++;
                            });
                        }
                    }
                    break;
                case 'ArrowUp':
                    if (this.squares[0].row > 0 && this.alignemnt === 'horizontal') {
                        spotTaken = checkForCars(this.squares[0].row - 1, this.squares[0].col);
                        if (!spotTaken) {
                            this.squares.forEach((square) => {
                                square.row--;
                            });
                        }
                    }
                    break;
                case 'ArrowDown':
                    if (this.squares[frontSquare].row < 5 && this.alignemnt === 'horizontal') {
                        spotTaken = checkForCars(this.squares[frontSquare].row + 1, this.squares[frontSquare].col);
                        if (!spotTaken) {
                            this.squares.forEach((square) => {
                                square.row++;
                            });
                        }
                    }
                    break;
            }
            drawBoard(this);
            setBorder();
        }
    }
}


function setUpBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            gameboard.append(`<div class="boardSquare"></div>`);
        }
    }
}

function checkForCars(row, col) {
    let returnVal = false;
    cars.forEach((car) => {
        car.squares.forEach((square) => {
            if (square.row === row && square.col === col) {
                returnVal = true;
            }
        });
    });
    return returnVal;
}

function setBorder() {
    cars.forEach((car) => {
        car.image.css({ border: "none" });
    });
    currentCar.image.css({ border: '4px solid rgb(60, 168, 168)' });
}

function drawBoard(car) {
    car.image.css({ top: car.squares[0].row * SQUARE_SIZE, left: car.squares[0].col * SQUARE_SIZE });

}

function addVehicle(car) {
    cars.push(car);
    topBoard.append(car.image);
    drawBoard(car);
}

function moveSelected() {
    for (let i = 0; i < cars.length; i++) {
        if (cars[i] === currentCar) {
            if (i < cars.length - 1) {
                currentCar = cars[i + 1];
            } else {
                currentCar = cars[0];
            }
            break;

        }

    }
    setBorder();
}


let myCar = new Vehicle(blueCar, 'vertical', [{ row: 0, col: 1 }, { row: 0, col: 2 }], false);
let myCar2 = new Vehicle(orangeCar, 'vertical', [{ row: 3, col: 3 }, { row: 3, col: 4 }], false);
let myRedCar = new Vehicle(redCar, 'vertical', [{ row: 2, col: 1 }, { row: 2, col: 2 }], true);
let myCar3 = new Vehicle(lightGreenCar, 'horizontal', [{ row: 2, col: 0 }, { row: 3, col: 0 }], false);
let myTruck = new Vehicle(grayTruck, 'horizontal', [{ row: 0, col: 3 }, { row: 1, col: 3 }, { row: 2, col: 3 }], false);
let myTruck2 = new Vehicle(orangeTruck, 'horizontal', [{ row: 3, col: 2 }, { row: 4, col: 2 }, { row: 5, col: 2 }], false);
let myTruck3 = new Vehicle(yellowTruck, 'horizontal', [{ row: 1, col: 5 }, { row: 2, col: 5 }, { row: 3, col: 5 }], false);
let myCar4 = new Vehicle(greenCar, 'vertical', [{ row: 5, col: 3 }, { row: 5, col: 4 }], false);
addVehicle(myCar);
addVehicle(myCar2);
addVehicle(myCar3);
addVehicle(myTruck);
addVehicle(myTruck2);
addVehicle(myTruck3);
addVehicle(myRedCar);
addVehicle(myCar4);
topBoard.append(road);
road.css({ top: 2 * SQUARE_SIZE, left: 6 * SQUARE_SIZE });
document.addEventListener('keydown', e => {
    if (currentCar) {
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown':
                currentCar.moveVehicle(e.key);
                break;
            case ' ':
                moveSelected();
        }
    }
});

cars.forEach((car) => {
    car.image.click(() => {
        currentCar = car;
        setBorder();
    });
});

setUpBoard();

