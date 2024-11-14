function saveToLocalStorage(data) {
  const dataObject = {
    updatedAt: new Date(Date.now()).toLocaleString("PT-BR"),
    data,
  };
  const stringifiedData = JSON.stringify(dataObject);
  localStorage.setItem("data", stringifiedData);
}

export { saveToLocalStorage };
