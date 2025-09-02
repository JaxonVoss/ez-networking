import './index.css'
import App from './App.tsx'
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.tsx";
import React from 'react';

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
