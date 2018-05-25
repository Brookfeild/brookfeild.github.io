function setup() {
  createCanvas(800, 800,WEBGL);
}

function draw() {
  background(220);
  rotateX(frameCount = -mouseY * 0.02);
  rotateY(frameCount = mouseX * 0.01);
  fill("blue");
  cone(250,250,24,16);
}
