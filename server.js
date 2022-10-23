const WebSocket = require('ws');
const port = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: port });

const clients = new Map();

/*class Message {
    constructor(from,type,content) {
        this.from = from;
        this.type = type;
        this.content = content;
    }
}

class MessageReception {
    constructor(to,type,content) {
        this.from = from;
        this.type = type;
        this.content = content;
    }
}*/

wss.on('connection', (ws) => {
    const id = uuidv4();
    const metadata = { id: id };

    clients.set(ws, metadata);

    ws.on('message', (messageAsString) => {
        //console.log("Message : "+messageAsString);
        /*const message = JSON.parse(messageAsString);
        const metadata = clients.get(ws);
  
        message.sender = metadata.id;
        message.color = metadata.color;
        const outbound = JSON.stringify(message);*/

        [...clients.keys()].forEach((client) => {
          client.send(messageAsString);
        });
    });
    ws.on("close", () => {
        clients.delete(ws);
    });
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
console.log("wss up");