// Move/Reaction time
// Abdullah Abdelshafi
// March 26 2026
//
// Extra for Experts:
// - Made a 5 second timer so if you run out of time you die 

let state = "loading";

const GRID_SIZE = 20;
let grid = [];
let cellSize;

let snakeX = 10;
let snakeY = 10;

let foodX;
let foodY;

let score = 0;
let timer = 5;

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
    cellSize = windowWidth / GRID_SIZE;
  }
  else {
    cellSize = windowHeight / GRID_SIZE;
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
    fill("red");
    rect(startX, startY, paddleWidth, paddleHeight);

    textSize(60);
    textAlign(CENTER);
    fill("red");
    text("Press Rectangle To Start", width/2, height/2);
  }

  if (state === "play") {
    background(220);
    updateGrid();
    showGrid();
    drawScore();
    drawTime();
    // checkTime();
  }

  if (state === "gameOver") {
    textSize(70);
    fill("white");
    textAlign(CENTER);
    text("Game Over", width/2, height/2);
  }
}

// Randomizes where the food is spawned
function spawnFood() {
  foodX = floor(random(GRID_SIZE));
  foodY = floor(random(GRID_SIZE));
}

// Updating the grid and the square you have to get too
function updateGrid() {
  // Clear grid
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x] = 0;
    }
  }

  grid[snakeY][snakeX] = 1;
  grid[foodY][foodX] = 2;
}

// Grid display
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

//  Moving keys 
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
  
  // Wall collision
  if (snakeX < 0 || snakeX >= GRID_SIZE || snakeY < 0 || snakeY >= GRID_SIZE) {
    state = "gameOver";
  }

  // Eating food
  if (snakeX === foodX && snakeY === foodY) {
    spawnFood();
    score += 1; // increase score
    
  }
  
  // Rest game
  if (key === "r") {
    state = "loading";
    snakeX = 10;
    snakeY = 10;
  }
}

// If the rectangle is clicked on loading screen
function mousePressed() {
  if (mouseX > startX && mouseX < startX + paddleWidth &&
      mouseY > startY && mouseY < startY + paddleHeight) {
    state = "play";
  }
}

// Keeps track of the score 
function drawScore(){
  fill("black");
  textSize(24);
  textAlign(RIGHT);
  text("Score:" + score, width - 10, 30);
}

// Keeps track of the time
function drawTime(){
  fill("black");
  textSize(24);
  textAlign(LEFT);
  text("Time:" + timer, width - 930, 30);
}




