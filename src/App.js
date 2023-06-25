import { useContext, useEffect } from "react";
import SocketClient from "socket.io-client";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { BASE_URL } from "./api/api";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-store";
import { getExpirationTime } from "./api/utils";

export let socket;
function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    socket = SocketClient(BASE_URL);
  }, []);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const expirationTime = getExpirationTime();
      if (expirationTime <= 0) authCtx.logout();
      else setTimeout(() => authCtx.logout(), expirationTime);
    }
  }, [authCtx]);

  let body = document.getElementsByTagName("body")[0];
  if (authCtx.isLoggedIn)
    body.style.background = "linear-gradient(to bottom left,#170e5f, #433491, #56382e)";
  else body.style.background = "#dfdfef";

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route
        path="*"
        element={<Navigate to="/auth" replace />}
      ></Route>
    </Routes>
  );
}

export default App;
