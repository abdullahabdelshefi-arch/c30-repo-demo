// fireworks opp

class particale{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.raduis = 3;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }
  update(){
    noStroke();
    this.x += this.dx;
    this.y += this.dy;
    this.opacity --;
  }
  display(){
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.raduis*2);
  }

  isDead(){
    return this.opacity <= 0;
  }
}


let theFirework = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("Black");
  for(let someFireworks of theFirework){
    if (someFireworks.isDead()){
      let index = theFirework.indexOf(someFireworks);
      theFirework.splice(index, 1);
    }
    else{
      someFireworks.update();
      someFireworks.display();
    }
  }
}

function mousePressed(){
  for ( let i = 0; i < 100; i++){
    let aFirework = new particale(mouseX, mouseY);
    theFirework.push(aFirework);
  }
}
