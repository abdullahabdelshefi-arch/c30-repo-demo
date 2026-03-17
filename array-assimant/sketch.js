// Array assimant
// Abdullah Abdelshafi
// March 9
//
// Extra for Experts:
// - Made it keep traking of the score on the right


// Defining variables
let paddleX;
let paddleY;
let x;
let y;
let xSpeed;
let ySpeed;
let paddleWidth;
let radius = 30;
let state = "loading";
let paddleHeight = 50;
let startX;
let startY;
let score = 0;
let powerUps = [];

// Stetting up the display
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  paddleX = width / 2.2;
  paddleY = height / 1.1;
  x = width / 2;
  y = height / 2;
  paddleWidth = 100;
  startX = x - 50;
  startY = y + 50;
  xSpeed = random(3, 4);
  ySpeed = random(3, 4);
}

// Drawing the whole thing
function draw() {
  background("black");
  if (state === "loading") {
    rect(startX, startY, paddleWidth, paddleHeight);
    textSize(70);
    fill("white");
    textAlign(CENTER);
    text("Press Rectangle To Start", width / 2, height / 2);
  }
  
  // If the state is play the game works
  if (state === "play") {
    background("red");
    displayRect();
    displayCircle();
    moveRect();
    moveBall();
    bounceOfWall();
    rectBounce();
    gameOver();
    spawnDrops();
    updateDrops();
    checkDropCatch();
    drawScore();
  }

  // If the ball passes write game over
  if (state === "gameOver") {
    textSize(70);
    fill("white");
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
  }
}
  

// If the mouse is pressed on the rectangle under the start button
function mousePressed() {
  if (mouseX > startX && mouseX < startX + paddleWidth && mouseY > startY && mouseY < startY + paddleHeight) {
    state = "play";
  }
}

// Restarting the game when r is pressed
function keyPressed(){
  if(key === "r"){
    state = "play";
    x = width / 2;
    y = height / 2;
    paddleWidth = 100;
    xSpeed = random(3,4);
    ySpeed = random(3,4);
    powerUps = [];
    score = 0;
  }
}

// Display the rectangle and ball
function displayRect() {
  fill("black");
  rect(paddleX, paddleY, paddleWidth, paddleHeight, 20);
}
function displayCircle() {
  fill("white");
  circle(x, y, radius);
}

// Move rectangle and ball
function moveRect() {
  if (keyIsDown(68) === true) {
    paddleX += 5;
  }
  if (keyIsDown(65) === true) {
    paddleX -= 5;
  }

  // stops the paddle from going off the screen
  if(paddleX < 0){
    paddleX = 0;
  }

  if(paddleX + paddleWidth > width){
    paddleX = width - paddleWidth;
  }
}
 
function moveBall() {
  x += xSpeed;
  y += ySpeed;
}

// Bouncing off the wall
function bounceOfWall() {
  // Side wall
  if (x + radius / 2 > width || x - radius / 2 < 0) {
    xSpeed *= -1;
  }
  // Top wall
  if (y - radius / 2 < 0) {
    ySpeed *= -1;
  }
}

// Makes random rectangles to pop up diffrent colors each with diffrent apilties or makes the ball faster 
function spawnDrops(){
  if(random(1) < 0.01){
    let drop = {
      x: 20,
      y: 0,
      size: 25,
      speed: 3,
      type: random(["big","small"]),
      r: 0,
      g: 0,
      b: 0
    };
    // Checks which kind it is
    if(drop.type === "big"){
      drop.r = 0;
      drop.g = 255;
      drop.b = 0;
    }
    if(drop.type === "small"){
      drop.r = 0;
      drop.g = 0;
      drop.b = 0;
    }
    powerUps.push(drop);
  }
}

// Drops the accual rectangles
function updateDrops(){
  for(let d of powerUps){
    d.y += d.speed;
    fill(d.r, d.g, d.b);
    rect(d.x, d.y, d.size, d.size);
  }
}

// Checks if the drop is touching the rectangle 
function checkDropCatch(){
  for(let i = 0; i < powerUps.length; i++){
    let d = powerUps[i];
    if(d.y + d.size >= paddleY && d.x > paddleX && d.x < paddleX + paddleWidth){
      if(d.type === "big"){
        paddleWidth += 3;
      }
      if(d.type === "small"){
        paddleWidth -= 2;
      }
    }
    if (d.y > paddleY){
      powerUps.splice(i, 1);
      console.log(powerUps);
    }
  }
}

// Boucing ball of the rectangle
function rectBounce() {
  if (y + radius / 2 >= paddleY && x > paddleX && x < paddleX + paddleWidth) {
    removeGlitch();
    score += 1; // increase score
  }
} 

// Removing it bouncing over and over at the bottom
function removeGlitch() {
  // Top it goes up the rect and then bounces if goes down u get 1 more life
  if (y + radius / 2 >= paddleY && x > paddleX && x < paddleX + paddleWidth ) {
    y = paddleY - radius / 2;
    ySpeed *= -1;
  }
}

// Keeps track of the score 
function drawScore(){
  fill(255);
  textSize(24);
  textAlign(RIGHT);
  text("Score:" + score, width - 10, 30);
}


// Checking if the game is over
function gameOver() {
  if (y - radius / 2 > height) {
    state = "gameOver";
  }
}
