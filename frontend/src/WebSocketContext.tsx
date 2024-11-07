import { createContext, useContext, useEffect, useState } from "react";
import { SenhasContext } from "./SenhasContext";

//Type this better
const WebSocketContext = createContext<Record<any, any>>({});

//Custom context provider
function WebSocketProvider({ children }) {
  const [socket, setSocket] = useState<WebSocket>();
  const { state, handleSocket } = useContext(SenhasContext);

  //UseEffect que estabelece conexão com web socket
  useEffect(() => {
    //Criando conexão com websocket
    const socket = new WebSocket("ws://localhost:8080");
    //Ao conexão com sucesso
    socket.onopen = () => {
      setSocket(socket);
      console.log("Conexão com o socket bem-sucedida!");
    };
    //Ao conexão dar erro
    socket.onerror = () => {
      console.error("Conexão com o socket mal-sucedida!");
    };
  }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.send(JSON.stringify(state));
  //   }
  // }, [state]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
}

function useWebSocket() {
  const { socket } = useContext(WebSocketContext);
  return socket;
}

export { useWebSocket, WebSocketProvider };
