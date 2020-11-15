(function () {
    'use strict';

    const canvas = document.getElementById('gameBoard');
    const context = canvas.getContext('2d');
    let interval;
    let currentApple;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Apple {

        constructor(image, context, x, y) {
            this.image = image;
            this.context = context;
            this.x = x;
            this.y = y;
            this.APPLE_SIZE = 64;
        }

        draw() {
            this.context.drawImage(this.image, this.x, this.y, this.APPLE_SIZE, this.APPLE_SIZE);
        }
    }

    class SnakeTail {

        constructor(image, context, x, y) {
            this.image = image;
            this.context = context;
            this.x = x;
            this.y = y;
            this.TAIL_SIZE = 64;
            this.moves = [];
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class Snake {

        constructor(image, context, x, y) {
            this.image = image;
            this.context = context;
            this.x = x;
            this.y = y;
            this.SNAKE_SIZE = 64;
            this.score = 0;
            this.tail = [];
            this.moves = [];
        }

        moveSnake() {
            let direction = 'ArrowRight';
            currentApple = placeApple();
            interval = setInterval(() => {

                trackSpots(this);
                if (this.tail.length > 0) {
                    this.tail.forEach((tailPart) => {
                        trackSpots(tailPart);
                    });
                }
                drawBoard(this, currentApple);

                switch (direction) {
                    case 'ArrowLeft':
                        this.x--;
                        break;
                    case 'ArrowRight':
                        this.x++;
                        break;
                    case 'ArrowUp':
                        this.y--;
                        break;
                    case 'ArrowDown':
                        this.y++;
                        break;
                }
                this.checkForApple();
                this.checkForWall();
            }, 10);

            document.addEventListener('keydown', e => {
                switch (e.key) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                    case 'ArrowLeft':
                    case 'ArrowRight':
                        direction = e.key;
                }
            });
        }

        checkForWall() {
            if (this.x < 0 || (this.x + this.SNAKE_SIZE) > canvas.width || this.y < 0 || (this.y + this.SNAKE_SIZE) > canvas.height) {
                clearInterval(interval);
                crash.play();
                drawBoard(this);
            }
        }

        checkForApple() {
            let checkX = Math.abs(this.x - currentApple.x);
            let checkY = Math.abs(this.y - currentApple.y);
            if (checkX < 55 && checkY < 55) {
                crunch.play();
                currentApple = placeApple();
                this.score++;
                this.tail.push(new SnakeTail(tailimage, context, this.moves[0].x, this.moves[0].y));
            }
        }
    }

    const appleImage = new Image();
    appleImage.src = 'images/apple.png';
    const snakeHeadimage = new Image();
    snakeHeadimage.src = 'images/snakehead.png';
    const tailimage = new Image();
    tailimage.src = 'images/snakeTail.png';
    const crunch = new Audio();
    crunch.src = 'audio/crunch.mp3';
    const crash = new Audio();
    crash.src = 'audio/crash.mp3';
    const backgroundTrack = new Audio();
    backgroundTrack.src = 'audio/backgroundTrack.mp3';
    backgroundTrack.muted = true;
    const snake = new Snake(snakeHeadimage, context, 0, 0);
    snakeHeadimage.addEventListener('load', () => {
        snake.moveSnake();
    });

    function placeApple() {
        return new Apple(appleImage, context, getRandomSpot(canvas.width), getRandomSpot(canvas.height));
    }

    function getRandomSpot(maxSize) {
        return Math.floor(Math.random() * (maxSize - 32));
    }

    function drawBoard(snake, apple) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (apple) {
            apple.draw();
        }
        if (snake.tail.length > 0) {
            snake.tail[0].setPosition(snake.moves[0].x, snake.moves[0].y);
            if (snake.tail.length > 1) {
                for (let i = 1; i < snake.tail.length; i++) {
                    snake.tail[i].setPosition(snake.tail[i - 1].moves[0].x, snake.tail[i - 1].moves[0].y);
                }
            }
            snake.tail.forEach((tailPart) => {
                context.drawImage(tailPart.image, tailPart.x, tailPart.y, tailPart.TAIL_SIZE, tailPart.TAIL_SIZE);
            });
        }
        context.drawImage(snake.image, snake.x, snake.y, snake.SNAKE_SIZE, snake.SNAKE_SIZE);
    }

    function trackSpots(part) {
        if (part.moves.length > 63) {
            part.moves.shift();
        }
        part.moves.push({ x: part.x, y: part.y });

    }

}());