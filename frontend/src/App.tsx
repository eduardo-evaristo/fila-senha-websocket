import ControladorSenhas from "./ControladorSenhas";
import FilaSenhas from "./FilaSenhas";
import { SenhasProvider } from "./SenhasContext";
import { WebSocketProvider } from "./WebSocketContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <WebSocketProvider>
        <SenhasProvider>
          <Routes>
            <Route index element={<ControladorSenhas />} />
            <Route path="apresentacao" element={<FilaSenhas />} />
          </Routes>
        </SenhasProvider>
      </WebSocketProvider>
    </BrowserRouter>
  );
}
