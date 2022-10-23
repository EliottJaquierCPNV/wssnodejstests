//Create a simple websocket client
const WebSocket = require('ws');

const ws = new WebSocket('wss://live-node-websockets.herokuapp.com/');
//const ws = new WebSocket('ws://localhost:3000');
const uuid = uuidv4();
var lastTimePing = Date.now();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

ws.on('open', function open() {
    sendNewPing();
});

ws.on('message', function message(data) {
  if(data.toString().split(";")[0] == "PING" && data.toString().split(";")[1] == uuid){
    console.log("PONG FROM SERVER IN "+(Date.now()-lastTimePing)+"ms");
    sendNewPing();
  }
});

function sendNewPing(){
    ws.send('PING;'+uuid);
    lastTimePing = Date.now();
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}