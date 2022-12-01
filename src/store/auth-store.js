import React, { useState } from "react";

const AuthContext = React.createContext({
  currentUserInfo: {
    token: "",
    displayName: "",
    photoUrl: "",
    localId: "",
  },
  isLoggedIn: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(
    JSON.parse(localStorage.getItem("currentUserInfo"))
  );

  const isLoggedIn = !!currentUserInfo;

  const getAuthUserData = async(token) => {
    return await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      }
    )
      .then((response) => response.json())
      .then((data) => data.users[0]);
    };
    
    const login = (token) => {
    getAuthUserData(token).then((userData) => {
      localStorage.setItem(
        "currentUserInfo",
        JSON.stringify({
          token: userData.token,
          displayName: userData.displayName,
          photoUrl: userData.photoUrl,
          localId: userData.localId,
        })
      );

      setCurrentUserInfo({
        token: userData.token,
        displayName: userData.displayName,
        photoUrl: userData.photoUrl,
        localId: userData.localId,
      });
    });
  };

  const logout = () => {
    setCurrentUserInfo(null);
    localStorage.removeItem("currentUserInfo");
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
