import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de importar desde 'react-dom/client'
import { StrictMode } from 'react';
import './index.css';
import singleSpaReact from 'single-spa-react';
import App from './App.jsx';

console.log('main.jsx está siendo ejecutado');

// Configuración de single-spa con React
const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
});

export const { bootstrap, mount, unmount } = lifecycles;

// Aquí utilizamos createRoot en lugar de render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);