// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// defining variables
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

// stetting up the display
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

function draw() {
  background("red");
  if (state === "loading") {
    rect(startX, startY, w, h);
    textSize(70);
    fill("white");
    textAlign(CENTER);
    text("Press Rectangle To Start", width / 2, height / 2);
  }
  // if the state is play the game works
  if (state === "play") {
    displayRect();
    displayCircle();
    moveRect();
    moveBall();
    bounceOfWall();
    rectBounce();
    gameOver();
  }

  // if the ball passes write game over
  if (state === "gameOver") {
    textSize(70);
    fill("white");
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
  }
}

// if the mouse is pressed on the rectangle under the start button
function mousePressed() {
  if (mouseX > startX && mouseX < startX + w && mouseY > startY && mouseY < startY + h) {
    state = "play";
  }
}

//  extra for experts when the mouse is scrolled up it increases the speed and down decreases
function mouseWheel(event) {
  if (event.delta > 0) {
    xSpeed *= 0.9;
    ySpeed *= 0.9;
  } else {
    xSpeed *= 1.1;
    ySpeed *= 1.1;
  }
}

//display the rectangle and circle
function displayRect() {
  fill("black");
  rect(rx, ry, w, h, 20);
}
function displayCircle() {
  fill("white");
  circle(x, y, radius);
}

// move rect and circle
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

// bouncing off the wall
function bounceOfWall() {
  if (x + radius / 2 > width || x - radius / 2 < 0) {
    xSpeed *= -1;
  }
  if (y - radius / 2 < 0) {
    ySpeed *= -1;
  }
}

// boucing ball of the rectangle
function rectBounce() {
  if (y + radius / 2 >= ry && x > rx && x < rx + w && ySpeed > 0) {
    ySpeed *= -1;
  }
}

// checking if the game is over
function gameOver() {
  if (y - radius / 2 > height) {
    state = "gameOver";
  }
}

//  image in the back 
// how do i say where i got the extra for experts 
//  is the form correct 
//  how do I fix if it touches the end of rectangle 
