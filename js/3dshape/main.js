function setup() {
  createCanvas(400, 400,WEBGL);
}

function draw() {
  background(220);
  rotateX(frameCount = -mouseY * 0.02);
  rotateY(frameCount = mouseX * 0.01);
  fill("blue");
  cone(100,100,24,16);
}
