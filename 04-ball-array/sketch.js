function setup() {
  createCanvas(600, 600);
  background("black");
  stroke("white");
  let circleX = 200;
  let circleY = 200;
  let circleDiameter = 100;
}

function draw() {
  circleDiameter = circleDiameter + 50;
  ellipse(circleX, circleY, circleDiameter, circleDiameter);
}