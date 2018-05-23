var valx = Math.floor(Math.random() * 6);
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  textSize(100)
  rect(100,100,200,200)
  fill(0)
  textSize(25)
  fill(0)
  text("Click Roll Dice for a new Number",25,66)
  if (valx === 1) {
    fill(0)
    ellipse(200,200,75,75);
    fill(255)
    text("1",192.5,205)
  } else {
    ellipse(1,1,1,1,1,1);
  }
    if (valx === 2) {
    fill(0)
    ellipse(145,145,75,75);
    ellipse(255,255,75,75);
    fill(0)
    text("2",192.5,205)
    fill(255)
  } else {
    ellipse(1,1,1,1,1,1);
  }
      if (valx === 3) {
    fill(0)
    ellipse(145,145,75,75);
    ellipse(255,255,75,75);
    ellipse(200,200,75,75);
    fill(255)
    text("3",192.5,205)
  } else {
    ellipse(1,1,1,1,1,1);
  }
      if (valx === 4) {
    fill(0)
    ellipse(145,145,75,75);
    ellipse(255,255,75,75);
    ellipse(255,145,75,75);
    ellipse(145,255,75,75);
    fill(0)
    text("4",192.5,205)
    fill(255)
  } else {
    ellipse(1,1,1,1,1,1);
  }
        if (valx === 5) {
    fill(0)
    ellipse(145,145,75,75);
    ellipse(255,255,75,75);
    ellipse(255,145,75,75);
    ellipse(145,255,75,75);
    ellipse(200,200,75,75);
    fill(255)
    text("5",192.5,205)
    fill(255)
  } else {
    ellipse(1,1,1,1,1,1);
  }
      if (valx === 0) {
    fill(0)
    ellipse(145,145,50,50);
    ellipse(255,255,50,50);
    ellipse(255,145,50,50);
    ellipse(145,255,50,50);
    ellipse(145,200,50,50);
    ellipse(255,200,50,50);
    fill(0)
    text("6",192.5,205)
    fill(255)
  } else {
    ellipse(1,1,1,1,1,1);
  }
}
