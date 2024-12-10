import React from "react";
import { createRoot } from "react-dom/client"; // Reemplaza ReactDOM.render
import App from "./App";

console.log("Montando aplicación React...");

// Selecciona el nodo raíz donde se montará la aplicación
const container = document.getElementById("root");
const root = createRoot(container); // Crea el contenedor raíz para React 18

// Monta la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);