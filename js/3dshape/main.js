function setup() {
  createCanvas(1000, 1000,WEBGL);
}

function draw() {
  background(220);
  rotateX(frameCount = -mouseY * 0.02);
  rotateY(frameCount = mouseX * 0.01);
  fill("blue");
  cone(400,400,24,16);
}
