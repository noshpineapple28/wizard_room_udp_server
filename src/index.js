const UDP = require("dgram");
// const WS = require("./WebSocketUDPClient");
const WS = require("ws");

const UDP_SERVER = UDP.createSocket("udp4");
// const WS_ADDRESS = "ws://172.16.8.127:3000";
const WS_ADDRESS = "ws://wizard-room-websockets-server-40bd8fdd0d82.herokuapp.com";
let ws;

const port = 8080;

const ARDUINOS = {
  servo: {
    state: 0,
    address: "172.16.8.146",
    port: "3000",
  },
};

UDP_SERVER.on("listening", () => {
  // Server address it’s using to listen
  const UDP_ADDRESS = UDP_SERVER.address();
  console.log(
    "Listining to ",
    "Address: ",
    UDP_ADDRESS.address,
    "Port: ",
    UDP_ADDRESS.port
  );
});

UDP_SERVER.on("message", (message, info) => {
});

UDP_SERVER.bind(port);

startWebSocketClient();

/**
 * WS SIDE
 */

function startWebSocketClient() {
  ws = new WS.WebSocket(
    WS_ADDRESS
  );

  // set on message callback
  ws.onopen = (d) => {
    setInterval(()=>ws.send(""), 30000);
    ws.onmessage = (msg) => handleMessage(msg.data);
  };
}

function handleMessage(msg) {
  // send message to the correct arduino
  if (msg === "servo") {
    console.log("SERVO CONNECT")
    const RESPONSE = Buffer.from("rotate");
    UDP_SERVER.send(RESPONSE, ARDUINOS[msg].port, ARDUINOS[msg].address, (err) => {
      if (err) {
        console.error("Failed to send response !!");
      }
    });
  } else if (msg === "welcome") {
    ws.send("UDP");
  } else {
    console.log("MSG: %s", msg);
  }
}