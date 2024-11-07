import { useContext, useEffect } from "react";
//Importação de componentes necessários
import { RightColumn, LeftColumn } from "./components/FilaSenhas/Columns";
import Senha from "./components/FilaSenhas/Senha";
import { SenhasContext } from "./SenhasContext";
import { useWebSocket } from "./WebSocketContext";

export default function FilaSenhas() {
  const { state, handleSocket } = useContext(SenhasContext);

  const socket = useWebSocket();

  useEffect(() => {
    if (socket) {
      socket.onmessage = (message) => {
        console.log(message);
        handleSocket(JSON.parse(message.data));
      };
    }
  }, [socket]);

  //Evento para ir à última senha possível, isso é, a nova senha que for gerada
  //TODO: Checar possibilidade de refatorar essa função usando condições dentro das outras duas funções

  return (
    <div className="wrapper">
      <RightColumn>
        <Senha
          senha={state.senhas[state.senhas.length - state.stepSenha - 1]}
          atual={true}
          key={Date.now()}
        />
      </RightColumn>
      <LeftColumn>
        <Senha
          senha={state.senhas[state.senhas.length - state.stepSenha - 2]}
        />
        <Senha
          senha={state.senhas[state.senhas.length - state.stepSenha - 3]}
        />
        <Senha
          senha={state.senhas[state.senhas.length - state.stepSenha - 4]}
        />
      </LeftColumn>
    </div>
  );
}
