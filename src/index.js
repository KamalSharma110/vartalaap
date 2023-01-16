import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
import { AuthContextProvider } from "./store/auth-store";
import { ChatContextProvider } from "./store/chat-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <ChatContextProvider>
      <AuthContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthContextProvider>
    </ChatContextProvider>
  </HashRouter>
);
