//Create a simple websocket client
const WebSocket = require('ws');

const ws = new WebSocket('wss://live-node-websockets.herokuapp.com/');
//Max 100 clients @ 2.8 msg/s (350ms) = 280 msg/s
//Max 50 clients @ 10 msg/s = 500 msg/s
//Max 40 clients @ 20 msg/s = 800 msg/s

//40 * 40ms (25 HZ) = 1000 requests / second
//50 * 60ms (16,6 HZ) = 830 requests / second
//100 * 345ms (2,9 HZ) = 290 requests / second

//const ws = new WebSocket('ws://localhost:3000'); 
//Max 100 clients @ 5 msg/s = 500 msg/s
//40 * 14ms (71,4 HZ) = 2840 requests / second
//50 * 23ms (43,5 HZ) = 2150 requests / second
//100 * 100ms (10 HZ) = 1000 requests / second

//If set to 0, it will resend a ping after the server has not responded to the previous ping
const contactServerEveryMillis = 0;

const uuid = uuidv4();
var lastTimePing = Date.now();

ws.on('open', function open() {
    console.log("Server opened!");
    if(contactServerEveryMillis === 0){
        sendNewPing();
    }else{
        setInterval(()=>{sendNewPing()},contactServerEveryMillis);
    }
});

ws.on('message', function message(data) {
  if(data.toString().split(";")[0] == "PING" && data.toString().split(";")[1] == uuid){
    console.log("PONG FROM SERVER IN "+(Date.now()-lastTimePing)+"ms");
    if(contactServerEveryMillis == 0){
        sendNewPing();
    }
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