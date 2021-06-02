import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { storeContextProvider as StoreContextProvider } from "reducer";

ReactDOM.render(
  <BrowserRouter basename="/">
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
