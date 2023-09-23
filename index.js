const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackgroung = "lightyellow";
const snakeColor = "lightGreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelosity = unitSize;
let yVelosity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}

];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();


function gameStart(){
        running = true;
        scoreText.textContent = score;
        createFood();
        drawFood();
        nextTick();
};
function nextTick(){
        if(running) {
                setTimeout(() => {
                        clearBoard();
                        drawFood();
                        moveSnake();
                        drawSnake();
                        checkGameOver();
                        nextTick();
                        
                }, 100);
        }
        else {
                displayGameOver();
        }
};
function clearBoard(){
        ctx.fillStyle=boardBackgroung;
        ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
        function randomFood(min,max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum
        }
        foodX = randomFood(0,gameWidth-unitSize);
        foodY = randomFood(0,gameWidth-unitSize);
      
};
function moveSnake(){
        const head = {x:snake[0].x + xVelosity, 
                      y:snake[0].y + yVelosity};

                snake.unshift(head);
                      if(snake[0].x == foodX && snake[0].y == foodY){
                        score++;
                        scoreText.textContent=score;
                        createFood();
                }
                else {
                        snake.pop();
                }
}
function drawSnake(){
        ctx.fillStyle=snakeColor;
        ctx.strokeStyle=snakeBorder;
        snake.forEach(snakePart => {
                ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
                ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
        })
};
function drawFood(){
        ctx.fillStyle = foodColor;
        ctx.fillRect(foodX,foodY,unitSize,unitSize);
        
};
function clearFood(){};
function changeDirection(event){
        const keyPressed=event.keyCode;
        const LEFT=37;
        const UP = 38;
        const RIGHT = 39;
        const DOWN = 40;

        const goingUp = (yVelosity == -unitSize);
        const goingDown = (yVelosity == unitSize);
        const goingRight = (xVelosity == unitSize);
        const goingLeft = (xVelosity == -unitSize);

        switch(true){
                case(keyPressed == LEFT && !goingRight):
                xVelosity = -unitSize;
                yVelosity = 0;
                break;

                case(keyPressed == UP && !goingDown):
                xVelosity = 0;
                yVelosity= -unitSize;
                break;

                case(keyPressed == RIGHT && !goingLeft):
                xVelosity = unitSize;
                yVelosity = 0;
                break;

                case(keyPressed == DOWN && !goingUp):
                xVelosity=0;
                yVelosity=unitSize;
                break;
        }

};
function checkGameOver(){
        switch(true){
                case(snake[0].x<0):
                running = false;
                break;

                case(snake[0].x >= gameWidth):
                running = false;
                break;
                case(snake[0].y< 0):
                running = false;
                break;
                case(snake[0].y >= gameHeight):
                running = false;
                break;
        }

        for(let i=1; i<snake.length; i++){
                if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
                running = false;
                }
        }
};
function displayGameOver(){
        clearBoard();
        ctx.font="50px MV Boli";
        ctx.fillStyle = "black";
        ctx.textAlign = "centre";
        ctx.fillText("Game Over!", gameHeight/4, gameWidth/2);
};
function resetGame(){
        score = 0;
        xVelosity = unitSize;
        yVelosity = 0;
         snake = [
                {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
         ];

        gameStart();
};
