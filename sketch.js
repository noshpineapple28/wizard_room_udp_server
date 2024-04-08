("use strict");

// global vars
let buttonFill;

let ws;
function startWebSocketClient() {
  ws = new WebSocket(
    "wss://wizard-room-websockets-server-40bd8fdd0d82.herokuapp.com"
  );

  // set on message callback
  ws.onopen = (d) => {
    setInterval(()=>ws.send(""), 30000);
  };
}

function sendRotate(msg) {
  ws.send("servo");
}

function setup() {
  startWebSocketClient();
  createCanvas(
    window.innerWidth - window.innerWidth * 0.02,
    window.innerHeight - window.innerHeight * 0.02
  );
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);

  buttonFill = color(255, 50, 50);
}

function draw() {
  background(49);
  noStroke();
  drawButton();

  fill(255);
}

function drawButton() {
  if (
    mouseX >= width / 2 - width * 0.15 &&
    mouseX <= width / 2 + width * 0.15 &&
    mouseY >= height / 2 - height * 0.15 &&
    mouseY <= height / 2 + height * 0.15
  ) {
    cursor(HAND);
    fill(color(155, 50, 50))
  } else {
    cursor(ARROW);
    fill(buttonFill);
  }
  ellipse(width / 2, height / 2, width * 0.3);
  fill(255);
  text("CLICK", width / 2, height / 2);
}

function mousePressed() {
  if (
    mouseX >= width / 2 - width * 0.15 &&
    mouseX <= width / 2 + width * 0.15 &&
    mouseY >= height / 2 - height * 0.15 &&
    mouseY <= height / 2 + height * 0.15
  ) {
    sendRotate();
  }
}
