import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AuthContextProvider from "./contexts/authContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
