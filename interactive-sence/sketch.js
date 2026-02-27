
// Interactive sence
// Abdulah Abdelshafi
// Febuary 24 2026
//
// Extra for Experts:
// I made it so that when you scrool the mouse wheel up it makes it harder and the speed faster and if you scrool down it makes it slower so it is easier. 


// Defining variables
let rx;
let ry;
let x;
let y;
let xSpeed;
let ySpeed;
let w;
let radius = 30;
let state = "loading";
let h = 50;
let startX;
let StartY;

// Stetting up the display
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rx = width / 2.2;
  ry = height / 1.1;
  x = width / 2;
  y = height / 2;
  w = 100;
  startX = x - 50;
  startY = y + 50;
  xSpeed = random(3, 4);
  ySpeed = random(3, 4);
}

// Drawing the whole thing
function draw() {
  background("black");
  if (state === "loading") {
    rect(startX, startY, w, h);
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
  if (mouseX > startX && mouseX < startX + w && mouseY > startY && mouseY < startY + h) {
    state = "play";
  }
}

// Extra for experts when the mouse is scrolled up it increases the speed and down decreases(reasources and google)
function mouseWheel(event) {
  // Down
  if (event.delta > 0 ) {
    xSpeed *= 0.9;
    ySpeed *= 0.9;
  } 
  // Up
  else {
    xSpeed *= 1.1;
    ySpeed *= 1.1;
  }
}

// Display the rectangle and ball
function displayRect() {
  fill("black");
  rect(rx, ry, w, h, 20);
}
function displayCircle() {
  fill("white");
  circle(x, y, radius);
}

// Move rectangle and ball
function moveRect() {
  if (keyIsDown(68) === true) {
    rx += 5;
  }
  if (keyIsDown(65) === true) {
    rx -= 5;
  }
}
 
function moveBall() {
  x += xSpeed;
  y += ySpeed;
}

// Bouncing off the wall
function bounceOfWall() {
  // side wall
  if (x + radius / 2 > width || x - radius / 2 < 0) {
    xSpeed *= -1;
  }
  // top wall
  if (y - radius / 2 < 0) {
    ySpeed *= -1;
  }
}

// Boucing ball of the rectangle
function rectBounce() {
  if (y + radius / 2 >= ry && x > rx && x < rx + w) {
    ySpeed *= -1;
  }
}

// Checking if the game is over
function gameOver() {
  if (y - radius / 2 > height) {
    state = "gameOver";
  }
}

// while loop if it is still contacting the rect from the top kepp going up till it isnt touching down keep moving down till it isnt touching
// while y + radius/2 <= top: ySpeed * -1
// while y + raduis/2 >= bottom: ySpeed * 1