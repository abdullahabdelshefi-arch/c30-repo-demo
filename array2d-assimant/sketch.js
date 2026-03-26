// 2d Array assimant
// Abdullah Abdelshafi
// March 26 2026
//
// Extra for Experts:
// - kkkkkkkkkkkkkkkkkkkkkkkkk

let state = "loading";
let paddleHeight = 50;
let startX;
let startY;
let paddleWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddleWidth = 100;
  startX = width/2 - 50;
  startY = height/2 + 50;
}

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
    foodOnFloor();
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
    state = "loading";
  }
}