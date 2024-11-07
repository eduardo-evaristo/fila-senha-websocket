import ControladorSenhas from "./ControladorSenhas";
import { WebSocketProvider } from "./WebSocketContext";

export default function App() {
  return (
    <WebSocketProvider>
      <ControladorSenhas />
    </WebSocketProvider>
  );
}
