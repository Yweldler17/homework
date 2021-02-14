'use strict';

import './css/style.css';
import $ from 'jquery';
import data from './data/puzzles.json';
import Vehicle from './vehicle';
import Puzzle from './puzzle';
let puzzleList = [];

const gameboard = $('#gameboard');
const topBoard = $('#topBoard');
const difficulty = $('#difficulty');
const cardImg = $('#cardImg');
const levelNum = $('#levelNum');
const previous = $('#previous');
const next = $('#next');

let SQUARE_SIZE = topBoard.width() / 6;
let currentPuzzle;
let currentCar;
let jqueryImage;

const road = $(`<img src="images/road.png" class="road" id="road" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="road">`);

function resizeboard() {
    if (currentPuzzle) {
        SQUARE_SIZE = topBoard.width() / 6;
        currentPuzzle.carsList.forEach((car) => {
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
}
window.addEventListener('resize', resizeboard);
resizeboard();

data.forEach((puzzle) => {
    let vehicleList = [];
    puzzle.vehicles.forEach((vehicle) => {
        jqueryImage = $(`<img src=${vehicle.image} class="cars" width="${vehicle.width * SQUARE_SIZE}" height="${vehicle.height * SQUARE_SIZE}" alt="Blue Car">`);
        vehicleList.push(new Vehicle(jqueryImage, vehicle.width, vehicle.height, vehicle.alignment, vehicle.squares));
    });
    puzzleList.push(new Puzzle(puzzle.difficulty, puzzle.level, puzzle.cardImage, vehicleList));
});


function setUpBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            gameboard.append(`<div class="boardSquare"></div>`);
        }
    }
    setFirstCard();
}

function setFirstCard() {
    setUpPuzzle(puzzleList[0]);
}

function setUpPuzzle(puzzle) {
    currentPuzzle = puzzle;
    difficulty.text("Difficulty: " + puzzle.difficulty);
    cardImg.attr('src', puzzle.cardImage);
    levelNum.text(puzzle.level);
    addVehicles(puzzle.carsList);
}

function addVehicles(carsList) {
    topBoard.empty();
    topBoard.append(road);
    road.css({ top: 2 * SQUARE_SIZE, left: 6 * SQUARE_SIZE });
    carsList.forEach((car) => {
        topBoard.append(car.image);
        drawBoard(car);
        car.image.on('click', () => {
            currentCar = car;
            setBorder();
        });
    });
}

function drawBoard(car) {
    car.image.css({ top: car.squares[0].row * SQUARE_SIZE, left: car.squares[0].col * SQUARE_SIZE });
}

function setBorder() {
    currentPuzzle.carsList.forEach((car) => {
        car.image.css({ border: "none" });
    });
    currentCar.image.css({ border: '4px solid rgb(60, 168, 168)' });
}

function moveVehicle(direction) {
    let frontSquare = currentCar.squares.length - 1;
    let spotTaken = false;
    switch (direction) {
        case 'ArrowLeft':
            if (currentCar.squares[0].col > 0 && currentCar.alignemnt === 'vertical') {
                spotTaken = checkForCars(currentCar.squares[0].row, currentCar.squares[0].col - 1);
                if (!spotTaken) {
                    currentCar.squares.forEach((square) => {
                        square.col--;
                    });
                }
            }
            break;
        case 'ArrowRight':

            if ((currentCar.squares[frontSquare].col < 5 || currentCar.squares[frontSquare].row === 2) && currentCar.alignemnt === 'vertical' && currentCar.squares[frontSquare].col < 7) {
                spotTaken = checkForCars(currentCar.squares[frontSquare].row, currentCar.squares[frontSquare].col + 1);
                if (!spotTaken) {
                    currentCar.squares.forEach((square) => {
                        square.col++;
                    });
                }
            }
            break;
        case 'ArrowUp':
            if (currentCar.squares[0].row > 0 && currentCar.alignemnt === 'horizontal') {
                spotTaken = checkForCars(currentCar.squares[0].row - 1, currentCar.squares[0].col);
                if (!spotTaken) {
                    currentCar.squares.forEach((square) => {
                        square.row--;
                    });
                }
            }
            break;
        case 'ArrowDown':
            if (currentCar.squares[frontSquare].row < 5 && currentCar.alignemnt === 'horizontal') {
                spotTaken = checkForCars(currentCar.squares[frontSquare].row + 1, currentCar.squares[frontSquare].col);
                if (!spotTaken) {
                    currentCar.squares.forEach((square) => {
                        square.row++;
                    });
                }
            }
            break;
    }
    drawBoard(currentCar);
    setBorder();
}

function checkForCars(row, col) {
    let returnVal = false;
    currentPuzzle.carsList.forEach((car) => {
        car.squares.forEach((square) => {
            if (square.row === row && square.col === col) {
                returnVal = true;
            }
        });
    });
    return returnVal;
}

document.addEventListener('keydown', e => {
    if (currentCar) {
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown':
                moveVehicle(e.key);
                break;
            case ' ':
                toggleSelection(1);
                break;
            case 'Enter':
                toggleSelection(-1);
        }
    }
});

function toggleSelection(num) {
    for (let i = 0; i < currentPuzzle.carsList.length; i++) {
        if (currentPuzzle.carsList[i] === currentCar) {
            if (num > 0) {
                if (i < currentPuzzle.carsList.length - 1) {
                    currentCar = currentPuzzle.carsList[i + num];
                } else {
                    currentCar = currentPuzzle.carsList[0];
                }
            } else {
                if (i < 1) {
                    currentCar = currentPuzzle.carsList[currentPuzzle.carsList.length - 1];
                } else {
                    currentCar = currentPuzzle.carsList[i + num];
                }
            }
            break;
        }
    }
    setBorder();
}

previous.on('click', () => {
    slideCard(-1);
});

next.on('click', () => {
    slideCard(1);
});

function slideCard(direction) {
    let currentSpot = puzzleList.indexOf(currentPuzzle);
    let newSpot = currentSpot + direction;
    if (newSpot === puzzleList.length) {
        newSpot = 0;
    } else if (newSpot < 0) {
        newSpot = puzzleList.length - 1;
    }
    setUpPuzzle(puzzleList[newSpot]);
}


setUpBoard();
