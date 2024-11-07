import { useContext, useEffect } from "react";
import { useWebSocket, WebSocketContext } from "./WebSocketContext";
import { SenhasContext } from "./SenhasContext";

export default function ControladorSenhas() {
  const { handleNova, handlePrev, handleProx, handleSocket } =
    useContext(SenhasContext);
  return (
    <>
      <button onClick={handleProx}>Chamar 1 senha posterior</button>
      <button onClick={handlePrev}>Chamar 1 senha anterior</button>
      <button onClick={handleNova}>Gerar e chamar nova senha</button>
    </>
  );
}
