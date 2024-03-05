import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

if (import.meta.env.MODE === "development") {
  import("./mocks/browser")
    .then(({ worker }) => {
      worker.start();
    })
    .then(() => {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
    });
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
