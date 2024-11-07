import { createContext, useEffect, useState } from "react";

//Type this better
const WebSocketContext = createContext<Record<any, any>>({});

//Custom context provider
function WebSocketProvider({ children }) {
  const [socket, setSocket] = useState<WebSocket>();
  //Criar definição do que devo receber
  const [senhas, setSenhas] = useState<any[]>([]);

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
    //Ao receber mensagem
    socket.onmessage = (message) => {
      const senhaNova = JSON.parse(message.data);
      setSenhas((prevSenhas) => [...prevSenhas, senhaNova]);
      //setMessages([...messages, newMessage]);
    };
  }, []);
  return (
    <WebSocketContext.Provider value={{ socket, senhas }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export { WebSocketContext, WebSocketProvider };
