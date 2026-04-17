// Ball Collision OOP demo

class Ball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.raduis = random(15,30);
    this.dx = random(5,-5);
    this.dy = random(5,-5);
    this.r = random(255);
    this.b = random(255);
    this.g = random(255) ;
  }

  display(){
    noStroke();
    fill(this.r,this.g,this.b);
    circle(this.x, this.y, this.raduis *2);
  }

  move(){
    this.x += this.dx;
    this.y += this.dy;

    //  check top and bottom 
    if (this.y - this.raduis < 0 || this.y + this.raduis > height){
      this.dy *= -1;
    }
    //  check sides 
    if (this.x - this.raduis < 0 || this.x + this.raduis > width){
      this.dx *= -1;
    }
  }
  
  bounceOff(otherBall){
    let radiiSum = this.raduis + otherBall.raduis;
    let distanceApart = dist(this.x, this.y,otherBall.x,otherBall.y);
    if (radiiSum > distanceApart){
      // hitting each other 
      let tempX = this.dx;
      let tempY = this.dy;

      this.dy = otherBall.dy;
      this.dx = otherBall.dx;
      
      otherBall.dx = tempX;
      otherBall.dy = tempY;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let ball of ballArray){
    ball.move();
    for (let otherBall of ballArray){
      //  avoid hiiting slef 
      if(ball !== otherBall){
        ball.bounceOff(otherBall);
      }
    }
    ball.display();
  }
}

function mousePressed(){
  let theBall = new Ball(mouseX, mouseY);
  ballArray.push(theBall);
}
