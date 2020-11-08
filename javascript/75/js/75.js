(function () {
    /*global $ */
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const colorPicker = $('#color');
    const numberInput = $('#antsNum');
    const createAnts = $('#create');
    const messageBox = $('#tooltip');
    const messageBoxText = $('#tooltiptext');

    let ants = [];
    let antHills = [];
    let antCount = 0;

    createAnts.click(() => {
        createAntHill(numberInput.val(), colorPicker.val());
    });

    canvas.addEventListener('mousemove', function (e) {
        let clickedX = e.pageX;
        let clickedY = e.pageY;
        let messageY = clickedY - 40;
        let messageX = clickedX - 10;
        for (let i = 0; i < antHills.length; i++) {
            if (Math.abs(clickedY - antHills[i].y) < 20 && Math.abs(clickedX - antHills[i].x) < 20) {
                messageBox.css({
                    top: messageY,
                    left: messageX,
                });
                messageBoxText.text(`Population: ${antHills[i].ants} Color: ${antHills[i].color} Strength: ${antHills[i].colonyStrength}`);
                messageBoxText.css({
                    visibility: 'visible'
                });
                break;
            } else {
                messageBoxText.css({
                    visibility: 'hidden'
                });
            }

        }
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class AntHill {

        constructor(color, coordinates, context) {
            this.color = color;
            this.x = coordinates[0];
            this.y = coordinates[1];
            this.context = context;
            this.rotationNumber = Math.PI / (Math.floor(Math.random() * 20) + 1);
            this.ants = 0;
            this.colonyStrength = 0;

            this.draw();
        }

        draw() {
            this.context.fillStyle = this.color;
            this.context.beginPath();
            this.context.ellipse(this.x, this.y, 10, 15, this.rotationNumber, 0, 2 * Math.PI);
            this.context.fill();
        }
    }

    class Ant {

        static SIZE = 2;

        constructor(context, home, index) {
            this.index = index;
            this.x = home.x;
            this.y = home.y;
            this.color = home.color;
            this.home = home;
            this.context = context;
            this.heading = 0;
            this.xDirection = 0;
            this.yDirection = 0;
            this.energy = 20;
            this.maxEnergy = 200;
            this.isInBattle = false;
            this.strength = 10;

            this.draw();
        }

        draw() {
            this.context.beginPath();
            this.context.fillRect(this.x, this.y, Ant.SIZE, Ant.SIZE);
        }

        move() {
            this.setDirection();
            this.checkEnergy();

            this.heading--;
            this.energy--;
            this.x += this.xDirection;
            this.y += this.yDirection;

            if (this.x < Ant.SIZE) {
                this.x = Ant.SIZE;
            } else if (this.x > canvas.width - Ant.SIZE) {
                this.x = canvas.width - Ant.SIZE;
            }

            if (this.y < Ant.SIZE) {
                this.y = Ant.SIZE;
            } else if (this.y > canvas.height - Ant.SIZE) {
                this.y = canvas.height - Ant.SIZE;
            }

            this.draw();
        }

        checkEnergy() {
            if (this.energy < 1) {
                this.xDirection = Math.sign(this.home.x - this.x);
                this.yDirection = Math.sign(this.home.y - this.y);
            }
            if (this.x === this.home.x && this.y === this.home.y) {
                this.energy = this.maxEnergy;
            }
        }

        setDirection() {
            if (this.heading < 1) {
                this.heading = (Math.floor(Math.random() * 25) + 1);
                this.xDirection = Ant.getRandomNumber(-1, 1);
                this.yDirection = Ant.getRandomNumber(-1, 1);
            }
        }

        static getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

    }

    function getRandomSpots() {
        let randomX = Math.floor(Math.random() * (canvas.width - 30) + 15);
        let randomY = Math.floor(Math.random() * (canvas.height - 30) + 15);
        return [randomX, randomY];
    }

    const context = canvas.getContext('2d');

    function createAntHill(numOfAnts, color) {
        let antHill1 = new AntHill(color, getRandomSpots(), context);
        antHills.push(antHill1);
        for (let i = 0; i < numOfAnts; i++) {
            ants.push(new Ant(context, antHill1, antCount++));
            antHill1.ants++;
        }
    }

    function checkForOtherAnts(ant) {
        for (let i = 0; i < ants.length; i++) {
            if (ant.color !== ants[i].color) {
                if (Math.abs(ant.x - ants[i].x) < 5 && Math.abs(ant.y - ants[i].y) < 5) {
                    ants = battle(ant, ants[i]);
                    break;
                }
            }
        }
    }

    function battle(antOne, antTwo) {
        let newArray = [];
        let winner;
        let loser;
        let antOnePower = antOne.strength * (antOne.energy / antOne.maxEnergy);
        let antTwoPower = antTwo.strength * (antTwo.energy / antTwo.maxEnergy);
        if (antOnePower > antTwoPower) {
            winner = antOne;
            loser = antTwo;
        } else {
            loser = antOne;
            winner = antTwo;
        }
        winner.strength += loser.strength;
        loser.home.ants--;
        newArray = ants.filter((ant) => {
            return ant.index !== loser.index;
        });

        return newArray;
    }

    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        antHills.forEach(antHill => {
            antHill.colonyStrength = 0;
        });
        ants.forEach(ant => {
            ant.move();
            ant.home.draw();
            ant.home.colonyStrength += ant.strength;
            checkForOtherAnts(ant);
        });
    }, 100);


}());