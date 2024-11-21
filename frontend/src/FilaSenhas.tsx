import { useContext } from "react";
import { RightColumn, LeftColumn } from "./components/FilaSenhas/Columns";
import Senha from "./components/FilaSenhas/Senha";
import { SenhasContext } from "./SenhasContext";

export default function FilaSenhas() {
  const { state } = useContext(SenhasContext); // Access queue and current step

  const { queue, currentStep } = state;

  return (
    <div className="wrapper">
      <RightColumn>
        {/* Render the current "senha" */}
        {queue.length > 0 && (
          <Senha
            senha={queue[queue.length - currentStep - 1]}
            atual={true}
            key={Date.now()} // Ensure unique keys
          />
        )}
      </RightColumn>
      <LeftColumn>
        {queue[queue.length - currentStep - 2] && (
          <Senha
            senha={queue[queue.length - currentStep - 2]} // 1st previous senha
            key={`prev-1`}
          />
        )}
        {queue[queue.length - currentStep - 3] && (
          <Senha
            senha={queue[queue.length - currentStep - 3]} // 2nd previous senha
            key={`prev-2`}
          />
        )}
        {queue[queue.length - currentStep - 4] && (
          <Senha
            senha={queue[queue.length - currentStep - 4]} // 3rd previous senha
            key={`prev-3`}
          />
        )}
      </LeftColumn>
    </div>
  );
}
