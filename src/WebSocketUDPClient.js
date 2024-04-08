// const WS = require("ws");
// const handleWSMessage = require("./index").handleWSMessage;

// const WS_ADDRESS = "ws://172.16.8.127:3000";
// let ws;

// function startWebSocketClient() {
//   ws = new WS.WebSocket(WS_ADDRESS);

//   // set on message callback
//   ws.onopen = (d) => {
//     ws.onmessage = (msg) => handleMessage(msg.data);
//   };
// }

// function handleMessage(msg) {
//   // send message to the correct arduino
//   if (msg === "welcome") {
//     ws.send("UDP");
//   } else {
//     handleWSMessage(msg);
//   }
// }
//  // export necessary files
// module.exports = {
//   startWebSocketClient,
// };