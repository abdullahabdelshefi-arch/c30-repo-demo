// Array assimant
// Abdullah Abdelshafi
// March 9
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


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
let powerUps = [];

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
    spawnDrops();
    updateDrops();
    checkDropCatch();
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
  // Side wall
  if (x + radius / 2 > width || x - radius / 2 < 0) {
    xSpeed *= -1;
  }
  // Top wall
  if (y - radius / 2 < 0) {
    ySpeed *= -1;
  }
}

// makes random rectangles to pop up diffrent colors each with diffrent apilties or makes the ball faster 
function spawnDrops(){
  if(random(1) < 0.01){
    let drop = {
      x: 20,
      y: -20,
      size: 25,
      speed: 3,
      type: random(["big","small"]),
      r: 0,
      g: 0,
      b: 0
    };
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

// drops the accual rectangles
function updateDrops(){
  for(let d of powerUps){
    d.y += d.speed;
    fill(d.r, d.g, d.b);
    rect(d.x, d.y, d.size, d.size);
  }
}

// checks if the drop is touching the rectangle 
function checkDropCatch(){
  for(let d of powerUps){
    if(d.y + d.size >= ry && d.x > rx && d.x < rx + w){
      if(d.type === "big" && w < 100){
        w += 3;
      }
      if(d.type === "small"  && w > 100){
        w -= 2;
      }
      d.y = height + 100;
    }
  }
}

// Boucing ball of the rectangle
function rectBounce() {
  if (y + radius / 2 >= ry && x > rx && x < rx + w) {
    removeGlitch();
  }
} 

// Removing it bouncing over and over at the bottom
function removeGlitch() {
  // top it goes up the rect and then bounces if goes down u get 1 more life
  if (y + radius / 2 >= ry && x > rx && x < rx + w ) {
    y = ry - radius / 2;
    ySpeed *= -1;
  }
}

// Checking if the game is over
function gameOver() {
  if (y - radius / 2 > height) {
    state = "gameOver";
  }
}