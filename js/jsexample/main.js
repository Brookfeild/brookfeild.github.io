function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
	//This Displays the background color//
	strokeWeight(10);
	//This Displays the width of the line//
	stroke(255,0,0);
	//This displays the color for the line//
	line(90,215,330,215);
	//This displays the line//
	textFont("Times New Roman");
	//This displays the font//
	textSize(100);
	//This is the font size//
	noStroke();
	//This shows that I dont need to use red again//
	stroke(255,0,0);
	//This shows that I want to use red again but for the out side of the text//
	fill(0,255,0);
	//This shows that I want the middle of the text to be green//
	text("Hello",100,200);
	//This says that I want it to say "Hello"//
	textSize(30)
	//This shows that I want the text size to be 30//
	text("This is a JS example",100,250);
	//This says I want it to say "This is an example//
	line(325,350,100,350)
  
	line(325,350,275,320)
  
	line(325,350,275,375)
  
	line(150,320,100,350)
  
	line(100,350,150,375)
  
	textSize(20)
  
  noStroke()
  
  fill(255,0,0)
  
	text("Which Way",165,320)
  
  textSize(25)
  
  text("Left",45,355)
  
  text("Right",335,355)
}
