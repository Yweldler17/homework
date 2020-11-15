(function () {

    /*global $ */
    'use strict';

    const canvas = document.getElementById('gameBoard');
    const context = canvas.getContext('2d');
    const newGameButton = $('#newGame');
    const scoreLabel = $('#scoreLabel');
    let playing = false;
    let interval;
    let currentApple;
    let currentTrack = 0;

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
            this.counter = 0;
            this.tail = [];
            this.moves = [];
            this.speed = 1;
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
                        this.x -= this.speed;
                        break;
                    case 'ArrowRight':
                        this.x += this.speed;
                        break;
                    case 'ArrowUp':
                        this.y -= this.speed;
                        break;
                    case 'ArrowDown':
                        this.y += this.speed;
                        break;
                }
                this.checkForApple();
                this.checkForWall();
                this.checkForTail();
                // scoreLabel.text(`${this.score}`);
            }, 2);

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

        endGame() {
            clearInterval(interval);
            crash.play();
            drawBoard(this);
            let highScore = localStorage.highScore || 0;
            if (this.score > highScore) {
                localStorage.highScore = this.score;
                setScoreLabel(`Good Game! You Set a New High Score! ${this.score}`);
            } else {
                setScoreLabel(`Good Game! Your Score is: ${this.score} - High Score: ${localStorage.highScore || 0}`);
            }
            playing = false;
        }

        checkForWall() {
            if (this.x < 0 || (this.x + this.SNAKE_SIZE) > canvas.width || this.y < 0 || (this.y + this.SNAKE_SIZE) > canvas.height) {
                this.endGame();
            }
        }

        checkForTail() {
            if (this.tail.length > 1) {
                for (let i = 1; i < this.tail.length; i++) {
                    let checkX = Math.abs(this.x - this.tail[i].x);
                    let checkY = Math.abs(this.y - this.tail[i].y);
                    if (checkX < 20 && checkY < 20) {
                        this.endGame();
                    }
                }
            }
        }

        checkForApple() {
            let checkX = Math.abs(this.x - currentApple.x);
            let checkY = Math.abs(this.y - currentApple.y);
            if (checkX < 55 && checkY < 55) {
                crunch.play();
                currentApple = placeApple();
                this.score++;
                this.counter++;
                this.tail.push(new SnakeTail(tailimage, context, this.moves[0].x, this.moves[0].y));
            }
            if (this.counter > 4) {
                this.counter = 0;
                this.speed++;
            }
            scoreLabel.text(`${this.score}`);
        }
    }

    const music = document.getElementById("player");
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

    $("#player").bind("ended", function () {
        if (currentTrack === 2) {
            currentTrack = -1;
        }
        currentTrack++;
        music.src = `audio/${currentTrack}.mp3`;
        music.load();
        music.play();
    });

    newGameButton.click(() => {
        if (!playing) {
            const snake = new Snake(snakeHeadimage, context, 0, 0);
            snake.moveSnake();
            playing = true;
            scoreLabel.css({ width: '10%', fontSize: '2em' });
        }
    });

    function setScoreLabel(textInput) {
        scoreLabel.css({ width: '95%', fontSize: '1.8em' });
        scoreLabel.text(`${textInput}`);
    }

    function placeApple() {
        return new Apple(appleImage, context, getRandomSpot(canvas.width), getRandomSpot(canvas.height));
    }

    function getRandomSpot(maxSize) {
        return Math.floor(Math.random() * (maxSize - 64));
    }

    function drawBoard(snake, apple) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (apple) {
            apple.draw();
        }
        if (snake.tail.length > 0) {
            //selecting the spot in array of previous moves to use. As the speed increases, the tail needs to follow closer to the head.
            let tailProximity = Math.trunc(snake.moves.length - (snake.SNAKE_SIZE / snake.speed));
            snake.tail[0].setPosition(snake.moves[tailProximity].x, snake.moves[tailProximity].y);
            if (snake.tail.length > 1) {
                for (let i = 1; i < snake.tail.length; i++) {
                    snake.tail[i].setPosition(snake.tail[i - 1].moves[tailProximity].x, snake.tail[i - 1].moves[tailProximity].y);
                }
            }
            snake.tail.forEach((tailPart) => {
                context.drawImage(tailPart.image, tailPart.x, tailPart.y, tailPart.TAIL_SIZE, tailPart.TAIL_SIZE);
            });
        }
        context.drawImage(snake.image, snake.x, snake.y, snake.SNAKE_SIZE, snake.SNAKE_SIZE);
    }
    // TrackSpots function is used to save the last 64 x and y coordinates of all snake parts (head and tail parts)
    function trackSpots(part) {
        if (part.moves.length > 63) {
            part.moves.shift();
        }
        part.moves.push({ x: part.x, y: part.y });
    }

}());