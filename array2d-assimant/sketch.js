// Snake Grid Game
// Abdullah Abdelshafi
// March 26 2026
//
// Extra for Experts:
// - kkk

let state = "loading";

const GRID_SIZE = 20;
let grid = [];
let cellSize;

let snakeX = 10;
let snakeY = 10;

let foodX;
let foodY;

// start button
let paddleHeight = 50;
let paddleWidth = 200;
let startX;
let startY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  startX = width/2 - paddleWidth/2;
  startY = height/2 + 50;

  if (width < height) {
    cellSize = width / GRID_SIZE;
  }
  else {
    cellSize = height / GRID_SIZE;
  }

  // create grid
  for (let y = 0; y < GRID_SIZE; y++) {
    grid[y] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x] = 0;
    }
  }

  spawnFood();
}

function draw() {
  background("black");

  if (state === "loading") {
    fill("white");
    rect(startX, startY, paddleWidth, paddleHeight);

    textSize(60);
    textAlign(CENTER);
    fill("white");
    text("Press Rectangle To Start", width/2, height/2);
  }

  if (state === "play") {
    background(220);
    updateGrid();
    showGrid();
    drawSnake();
  }

  if (state === "gameOver") {
    textSize(70);
    fill("white");
    textAlign(CENTER);
    text("Game Over", width/2, height/2);
  }
}

function spawnFood() {
  foodX = floor(random(GRID_SIZE));
  foodY = floor(random(GRID_SIZE));
}

function updateGrid() {

  // clear grid
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x] = 0;
    }
  }

  grid[snakeY][snakeX] = 1;
  grid[foodY][foodX] = 2;
}

function showGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {

      if (grid[y][x] === 0) {
        fill("white");
      }

      if (grid[y][x] === 1) {
        fill("green");
      }

      if (grid[y][x] === 2) {
        fill("red");
      }

      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function keyPressed() {
  if (key === "w") {
    snakeY--;
  }

  if (key === "s") {
    snakeY++;
  }

  if (key === "a") {
    snakeX--;
  }

  if (key === "d") {
    snakeX++;
  }
  
  // wall collision
  if (snakeX < 0 || snakeX >= GRID_SIZE || snakeY < 0 || snakeY >= GRID_SIZE) {
    state = "gameOver";
  }

  // eating food
  if (snakeX === foodX && snakeY === foodY) {
    spawnFood();
  }
  
  // rest game
  if (key === "r") {
    state = "loading";
    snakeX = 10;
    snakeY = 10;
  }
}

//  If the rectangle is clicked on loading screen
function mousePressed() {
  if (mouseX > startX && mouseX < startX + paddleWidth &&
      mouseY > startY && mouseY < startY + paddleHeight) {
    state = "play";
  }
}

// how to give the snake another tail
function growSnake() {
  let tail = snake[snake.length - 1];
  // add a new block at the end
  snake.push({x: tail.x, y: tail.y});
}

// checks if you have to add ahead to the snake
function checkFood() {
  let head = snake[0];
  if (head.x === food.x && head.y === food.y) {
    growSnake();   // 👈 THIS is what you wanted
    spawnFood();
  }
}

// drawing the snake
function drawSnake() {
  fill("green");
  for (let s of snake) {
    square(s.x * cellSize, s.y * cellSize, cellSize);
  }
}





