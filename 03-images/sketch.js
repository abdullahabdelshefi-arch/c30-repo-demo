// image demo

let marioImg;

function preload(){
  marioImg = loadImage("cars.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(marioImg, mouseX/2, mouseY/2, marioImg.Width*1.2, marioImg.Height *1.2);
}
