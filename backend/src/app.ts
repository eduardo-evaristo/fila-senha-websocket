import { RawData, WebSocket } from "ws";
import server from "./server";
import { IncomingMessage } from "http";

// State Management
let sockets: WebSocket[] = [];
let queue: any[] = [];
let currentStep = 0;

// Utility functions to generate data
function generateSenha(tipo: string) {
  const randomNumber = Math.trunc(Math.random() * 500) + 1;
  const guiche = Math.trunc(Math.random() * 10) + 1;

  return {
    tipo,
    senha: `${tipo === "Preferencial" ? "P" : "D"}${randomNumber}`,
    guiche,
  };
}

// Broadcast message to all sockets
function broadcast(data: any) {
  const message = JSON.stringify(data);
  sockets.forEach((socket) => {
    socket.send(message);
  });
}

// WebSocket Server Connection
server.on("connection", (socket: WebSocket, req: IncomingMessage) => {
  connectSocket(socket);
  console.log(`Socket: ${req.socket.remoteAddress} connected.`);

  socket.on("message", (data: RawData) => {
    try {
      const { action, type } = JSON.parse(data.toString());

      switch (action) {
        case "generate":
          // Generate a new item with the specified type
          const newSenha = generateSenha(
            type === 1 ? "Preferencial" : "Convencional"
          );
          queue.push(newSenha);
          currentStep = 0;
          broadcast({ type: "update", queue, currentStep });
          break;

        case "next":
          if (currentStep < queue.length - 1) {
            currentStep++;
            broadcast({ type: "update", queue, currentStep });
          } else {
            socket.send(
              JSON.stringify({ type: "error", message: "No more items." })
            );
          }
          break;

        case "prev":
          if (currentStep > 0) {
            currentStep--;
            broadcast({ type: "update", queue, currentStep });
          } else {
            socket.send(
              JSON.stringify({
                type: "error",
                message: "Already at the start.",
              })
            );
          }
          break;

        case "clear":
          // Clear the queue and reset state
          queue = [];
          currentStep = 0;
          broadcast({ type: "update", queue, currentStep });
          console.log("Broadcasting cleared state:", { queue, currentStep });

          console.log("Queue has been cleared.");
          break;

        case "state":
          socket.send(JSON.stringify({ type: "update", queue, currentStep }));
          break;

        default:
          socket.send(
            JSON.stringify({ type: "error", message: "Invalid action." })
          );
      }
    } catch (error) {
      socket.send(
        JSON.stringify({ type: "error", message: "Invalid message format." })
      );
    }
  });

  socket.on("close", () => {
    closeSocket(socket);
    console.log(`Socket: ${req.socket.remoteAddress} disconnected.`);
  });
});

// Socket management
function connectSocket(socket: WebSocket) {
  sockets.push(socket);
}

function closeSocket(toBeRemovedSocket: WebSocket) {
  sockets = sockets.filter((socket) => socket !== toBeRemovedSocket);
}
