import { useContext } from "react";
import { WebSocketContext } from "./WebSocketContext";

function geradorSenha() {
  const numeroAleatorio = Math.trunc(Math.random() * 500) + 1;
  return `D${numeroAleatorio}`;
}

function geradorGuiche() {
  return Math.trunc(Math.random() * 10) + 1;
}

export default function ControladorSenhas() {
  const { socket, senhas } = useContext(WebSocketContext);
  function handleNova() {
    //Novo objeto literal de senha
    const novaSenha = {
      tipo: "Convencional",
      senha: geradorSenha(),
      guiche: geradorGuiche(),
    };
    //Envia json do objeto
    socket.send(JSON.stringify(novaSenha));
  }

  //   function handleProx() {
  //     if (stepSenha === 0) {
  //       handleNova();
  //     } else {
  //       setStepSenha((prevStepSenha) => prevStepSenha - 1);
  //     }
  //   }
  //   //Evento para ir à senha posterior
  //   function handlePrev() {
  //     if (senhas.length > stepSenha) {
  //       setStepSenha((prevStepSenha) => prevStepSenha + 1);
  //     }
  //   }
  return (
    <>
      {/* <button onClick={handleProx}>Chamar 1 senha posterior</button>
      <button onClick={handlePrev}>Chamar 1 senha anterior</button> */}
      <button onClick={handleNova}>Gerar e chamar nova senha</button>
    </>
  );
}
