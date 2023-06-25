import React, { useContext, useState } from "react";
import ChatContext from "./chat-context";
import { getAuthUserData } from "../api/utils";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  currentUserInfo: {
    token: "",
    displayName: "",
    photoUrl: "",
    localId: "",
    expirationTime: "",
  },
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(
    JSON.parse(localStorage.getItem("currentUserInfo"))
  );
  const navigate = useNavigate();
  const chatCtx = useContext(ChatContext);
  const isLoggedIn = !!currentUserInfo;

  const login = (token, localId) => {
    return getAuthUserData(token, localId).then((userData) => {
      const date = new Date();
      date.setHours(date.getHours() + 1);
      const expirationTime = date.toISOString();

      localStorage.setItem(
        "currentUserInfo",
        JSON.stringify({
          token: token,
          displayName: userData.displayName,
          photoUrl: userData.photoUrl,
          localId: userData.localId,
          expirationTime: expirationTime,
        })
      );

      setCurrentUserInfo({
        token: token,
        displayName: userData.displayName,
        photoUrl: userData.photoUrl,
        localId: userData.localId,
        expirationTime: expirationTime,
      });
    });
  };

  const logout = () => {
    setCurrentUserInfo(null);
    chatCtx.dispatchChatState({ type: "LOGGED_OUT" });
    localStorage.removeItem("currentUserInfo");
    navigate('/auth');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUserInfo: currentUserInfo,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
