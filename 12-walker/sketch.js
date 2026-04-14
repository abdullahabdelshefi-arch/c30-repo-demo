// walker OOP demo

class Walker{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.diametar = 2;
    this.color = "red";
    this.speed = 5;
  }
  
  display(){
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diametar);
  }
  move(){
    let choice = random(100);
    if (choice < 25){
      // up
      this.y -= this.speed;
    }
    else if (choice < 50){
      // down
      this.y += this.speed;
    }
    else if (choice < 75){
      // left
      this.x -= this.speed;
    }
    else{
      // right
      this.x += this.speed;
    }
  }
}


let tyler;
let abd;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tyler = new Walker(width/2, height/2);
  abd = new Walker(300,300);
  abd.color  = "blue";
}

function draw() {
  tyler.display();
  tyler.move();
  abd.display();
  abd.move();
}
