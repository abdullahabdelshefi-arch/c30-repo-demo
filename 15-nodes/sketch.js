// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let nodes = [];

class MovingPoint{
  constructor(x,y){
    this.x = x;
    this.y = y; 
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.05;
    this.radius = 15;
    this.speed = 5;
    this.color = color(random(255), random(255), random(255));
    this.reach = 100;
  }
  display(){
    noStroke;
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }
  update(){
    this.move();
    this.wrap();
  }

  connectTo(nodesArray){
    for (let otherNode of nodesArray){
      if (this!== otherNode){
        let distanceAway = dist(this.x, this.y, otherNode.x, otherNode.y);
        if (distanceAway < this.reach){
          stroke(this.color);
          line (this.x,this.y,otherNode.x, otherNode.y);
        }
      }
    }
  }

  wrap(){
    if (this.x < 0){
      this.x -= width;
    }
    if (this.y < 0){
      this.y -= height;
    }
    if (this.x > 0){
      this.x += width;
    }
    if (this.y > 0){
      this.y += height;
    }
  }
  
  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale 0 to 1 
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0 , 1,-this.speed, this.speed);

    this.x += dx;
    this.y += dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let node of nodes){
    node.display();
    node.update();
    node.connectTo(nodes);
  }
}

function mousePressed(){
  let somePoint = new MovingPoint(mouseX, mouseY);
  nodes.push(somePoint);
}