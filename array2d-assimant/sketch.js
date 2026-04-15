// Move/Reaction time
// Abdullah Abdelshafi
// March 26 2026
//
// Extra for Experts:
// - Made a 1 minute timer so if you run out of time you die and make it so it saves your best score


let state = "loading";


const GRID_SIZE = 20;
let grid = [];
let cellSize;


let snakeX = 10;
let snakeY = 10;


let foodX;
let foodY;


let score = 0;
let bestScore = 0;
let timer = 60;
let lastTime = 0;


// start button
let paddleHeight = 50;
let paddleWidth = 200;
let startX;
let startY;
let savedScore;


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
  // local best score gets the best score 
  bestScore = getItem("bestScore") || 0;
}


// creates everything
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
    updateTime();
  }

  //  what happens if you die and best score saved
  if (state === "gameOver") {
    if (score > bestScore) {
      bestScore = score;
      storeItem("bestScore", bestScore);
    } 
    textSize(70);
    fill("white");
    textAlign(CENTER);
    text("Game Over", width/2, height/2);
    text(`Best Score: ${bestScore}`, width/2  + 20, height/2 + 100);
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
    if (score > bestScore) {
      bestScore = score;
      storeItem("bestScore", bestScore);
    }
    state = "gameOver";
  }


  // Eating food and getting score increase and save to local storage
  if (snakeX === foodX && snakeY === foodY) {
    spawnFood();
    score += 1;
  }
 
  // Rest game
  if (key === "r") {
    state = "loading";
    snakeX = 10;
    snakeY = 10;
    timer = 60;
    score = 0;
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


// updates the timer
function updateTime() {
  if (millis() - lastTime >= 1000) {
    timer--;
    lastTime = millis();
  }
  if (timer <= 0) {
    if (score > bestScore) {
      bestScore = score;
      storeItem("bestScore", bestScore);
    }
    state = "gameOver";
  }
}

