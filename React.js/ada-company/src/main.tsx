import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./styles/globals.css";

import { BrowserRouter } from "react-router-dom";

import { StoreProvider } from "./redux/StoreProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
