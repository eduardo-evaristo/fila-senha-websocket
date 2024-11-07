import { createContext, useReducer } from "react";
import { useWebSocket } from "./WebSocketContext";

function geradorSenha() {
  const numeroAleatorio = Math.trunc(Math.random() * 500) + 1;
  return `D${numeroAleatorio}`;
}

function geradorGuiche() {
  return Math.trunc(Math.random() * 10) + 1;
}

function geraSenha() {
  const novaSenha = {
    tipo: "Convencional",
    senha: geradorSenha(),
    guiche: geradorGuiche(),
  };
  return novaSenha;
}

const SenhasContext = createContext<Record<any, any>>({});

const initialState = { senhas: [], stepSenha: 0 };

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "novaSenha": {
      const returnedState = {
        ...state,
        senhas: [...state.senhas, action.payload],
        stepSenha: 0,
      };
      action.socket.send(JSON.stringify(returnedState));
      return returnedState;
    }

    case "proximaSenha": {
      const returnedState = {
        ...state,
        senhas:
          state.stepSenha === 0 ? [...state.senhas, geraSenha()] : state.senhas,
        stepSenha:
          state.stepSenha === 0 ? state.stepSenha : state.stepSenha - 1,
      };
      action.socket.send(JSON.stringify(returnedState));
      return returnedState;
    }
    case "anteriorSenha": {
      const returnedState = {
        ...state,
        stepSenha:
          state.senhas.length > state.stepSenha
            ? state.stepSenha + 1
            : state.stepSenha,
      };
      action.socket.send(JSON.stringify(returnedState));
      return returnedState;
    }
    case "socket":
      return action.payload;
  }
}

function SenhasProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const socket = useWebSocket();

  function handleNova() {
    //Novo objeto literal de senha
    const novaSenha = geraSenha();
    dispatch({ type: "novaSenha", payload: novaSenha, socket });
  }

  //Evento para ir à próxima senha sem gerar uma nova
  function handleProx() {
    dispatch({ type: "proximaSenha", socket });
  }
  //Evento para ir à senha posterior
  function handlePrev() {
    dispatch({ type: "anteriorSenha", socket });
  }

  function handleSocket(payload) {
    dispatch({ type: "socket", payload });
  }

  return (
    <SenhasContext.Provider
      value={{ state, handleNova, handlePrev, handleProx, handleSocket }}
    >
      {children}
    </SenhasContext.Provider>
  );
}

export { SenhasProvider, SenhasContext };
