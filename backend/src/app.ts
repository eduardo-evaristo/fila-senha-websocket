import { RawData, WebSocket } from "ws";
import server from "./server";
import { IncomingMessage } from "http";

//Initialize array of connected sockets
let sockets: WebSocket[] = [];

//Whenever our server gets a connection, we take the socket that connected and
server.on("connection", (socket: WebSocket, req: IncomingMessage) => {
  //Add it to our list of known sockets connections
  connectSocket(socket);
  console.log(`Socket: ${req.socket.remoteAddress} has connected.`);

  //What do to when our server gets a message from said socket
  socket.on("message", (data: RawData) => {
    //Turns buffer/raw data back into string/JSON
    const message: string = data.toLocaleString();
    //Share message to each connected socket but the sender
    sendMessage(socket, message);
  });

  //Removing socket from array whenever it closes the connection
  socket.on("close", () => {
    //Filter socket out of sockets
    closeSocket(socket);
    console.log(`Socket: ${req.socket.remoteAddress} has been disconnected.`);
  });
});

//Functions
function sendMessage(senderSocket: WebSocket, message: string) {
  sockets.forEach((socket) => {
    if (socket === senderSocket) return;
    socket.send(message);
  });
}

function closeSocket(toBeRemovedSocket: WebSocket) {
  sockets = sockets.filter((socket) => socket !== toBeRemovedSocket);
}

function connectSocket(socket: WebSocket) {
  sockets.push(socket);
}
