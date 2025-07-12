import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import the CSS here as well
import "./Confetti.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
