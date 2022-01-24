import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Wordle from "./Wordicle";

ReactDOM.render(
  <React.StrictMode>
    <Wordle />
  </React.StrictMode>,
  document.getElementById("root")
);

window.addEventListener("load", () => {
  navigator.serviceWorker
    .register("./service_worker.js")
    .then((reg) => console.log("Service worker: Registered"))
    .catch((err) => console.log(`Service worker: Error: ${err}`));
});
