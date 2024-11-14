import { useContext, useState } from "react";
import { SenhasContext } from "./SenhasContext";
import styles from "./ControladorSenhas.module.css";
import Button from "./components/FilaSenhas/Button";

export default function ControladorSenhas() {
  const { handleNova, handlePrev, handleProx, handleLocalStorage } =
    useContext(SenhasContext);
  const [localStorageData] = useState(() => {
    const json = localStorage.getItem("data");
    return JSON.parse(json!) || null;
  });

  //There has to be a better way to name this
  function handleLocalStorage1() {
    handleLocalStorage(localStorageData.data);
  }

  return (
    <>
      {localStorageData ? (
        <button onClick={handleLocalStorage1}>
          Usar senhas de {localStorageData.updatedAt}
        </button>
      ) : null}
      <button onClick={handleProx}>Chamar 1 senha posterior</button>
      <button onClick={handlePrev}>Chamar 1 senha anterior</button>
      <button onClick={handleNova}>Gerar e chamar nova senha</button>
      <Modal options={["Sim", "Não"]}>Deseja usar as senhas antigas?</Modal>
    </>
  );
}

function Modal({ children, options }) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h1>{children}</h1>
        <div>
          <Button>{options[0]}</Button>
          <Button>{options[1]}</Button>
        </div>
      </div>
    </div>
  );
}
