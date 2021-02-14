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
    let foodList = [];
    let antCount = 0;
    let foodCounter = 0;
    let isMessage = false;

    createAnts.click(() => {
        createAntHill(numberInput.val(), colorPicker.val());
    });

    function setMessage(antHill, y, x) {
        isMessage = true;
        messageBox.css({
            top: y,
            left: x,
        });
        messageBoxText.text(`Colony Population: ${antHill.ants} Colony Color: ${antHill.color} Colony Strength: ${antHill.colonyStrength} Colony Energy: ${antHill.colonyEnergy} Colony Food: ${antHill.foodQuantity}`);
        messageBoxText.css({
            visibility: 'visible'
        });
    }

    canvas.addEventListener('mousemove', function (e) {
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        let messageY = mouseY - 40;
        let messageX = mouseX - 10;
        for (let i = 0; i < antHills.length; i++) {
            if (Math.abs(mouseY - antHills[i].y) < 15 && Math.abs(mouseX - antHills[i].x) < 15) {
                if (!isMessage) {
                    setMessage(antHills[i], messageY, messageX);
                    break;
                }
            } else {
                messageBoxText.css({
                    visibility: 'hidden'
                });
                isMessage = false;
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
            this.foodQuantity = 50;
            this.colonyStrength = 0;
            this.colonyEnergy = 0;

            this.draw();
        }

        draw() {
            this.context.fillStyle = this.color;
            this.context.beginPath();
            this.context.ellipse(this.x, this.y, 10, 15, this.rotationNumber, 0, 2 * Math.PI);
            this.context.fill();
        }
    }

    class AntFood {

        constructor(coordinates, context) {
            this.x = coordinates[0];
            this.y = coordinates[1];
            this.context = context;
            this.color = 'green';
            this.quantity = 200;
            this.rotationNumber = Math.PI / (Math.floor(Math.random() * 20) + 1);

            this.draw();
        }

        draw() {
            this.context.fillStyle = this.color;
            this.context.beginPath();
            this.context.ellipse(this.x, this.y, 20, 5, this.rotationNumber, 0, 2 * Math.PI);
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
            this.maxEnergy = 300;
            this.isInBattle = false;
            this.strength = 10;
            this.hasFood = false;
            this.food = 0;

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
            if (this.energy < 1 || this.hasFood) {
                this.goToTarget(this.home);
            }
            if (this.x === this.home.x && this.y === this.home.y) {
                this.energy = this.maxEnergy;
                if (this.home.foodQuantity > 0) {
                    this.home.foodQuantity--;
                }
                if (this.hasFood) {
                    this.home.foodQuantity++;
                    this.hasfood = false;
                }
            }
        }

        goToTarget(target) {
            this.xDirection = Math.sign(target.x - this.x);
            this.yDirection = Math.sign(target.y - this.y);
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

    function checkForFood(ant) {
        for (let i = 0; i < foodList.length; i++) {
            if (Math.abs(ant.x - foodList[i].x) < 5 && Math.abs(ant.y - foodList[i].y) < 5) {
                foundFood(ant, foodList[i]);
                break;
            }
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

    function foundFood(ant, food) {
        food.quantity--;
        ant.hasFood = true;
        ant.food = food;
        // ants.forEach(otherAnt => {
        //     if (ant.color === otherAnt.color) {
        //         otherAnt.food = food;
        //         if (!otherAnt.hasFood) {
        //             otherAnt.goToTarget(food);
        //         }
        //     }
        // });
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
        winner.maxEnergy = winner.strength * 20;
        loser.home.ants--;
        newArray = ants.filter((ant) => {
            return ant.index !== loser.index;
        });

        return newArray;
    }

    function foodCheck() {
        if (foodCounter-- < 1) {
            foodList.push(new AntFood(getRandomSpots(), context));
            foodCounter = 500;
        }
    }

    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (antHills.length > 0) {
            foodCheck();
        }
        foodList.forEach(food => {
            food.draw();
        });
        antHills.forEach(antHill => {
            antHill.colonyStrength = 0;
            antHill.colonyEnergy = 0;
        });
        ants.forEach(ant => {
            ant.move();
            ant.home.draw();
            ant.home.colonyStrength += ant.strength;
            ant.home.colonyEnergy += ant.energy;
            checkForOtherAnts(ant);
            checkForFood(ant);
        });
    }, 100);


}());