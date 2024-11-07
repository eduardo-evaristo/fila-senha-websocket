import server from "./server";

//Initialize array of connected sockets
let sockets = [];

//Whenever our server gets a connection, we take the socket that connected and
server.on("connection", (socket) => {
  //Add it to our list of known sockets connections
  sockets.push(socket);

  //What do to when our server gets a message from said socket
  socket.on("message", (data) => {
    //Turns buffer back into string/JSON
    const senhas = data.toLocaleString();
    //Share message to each connected socket
    sockets.forEach((socket) => {
      socket.send(senhas);
    });
  });
});
