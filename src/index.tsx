import React from "react";
import ReactDOM from "react-dom/client";
import { setup } from "twind";
import App from "./App";
import "./index.css";

setup({
  theme: {
    extend: {
      screens: {
        landscape: { raw: "(orientation: landscape)" },
        portrait: { raw: "(orientation: portrait)" },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
