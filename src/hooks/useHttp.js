import { useContext, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import registerUser from "../api/api";

import AuthContext from "../store/auth-store";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const displayNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const sendRequest = async (url, showLogin) => {
    try {
      setIsLoading(true);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
          returnSecureToken: true,
        }),
      });

      setIsLoading(false);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      const idToken = data.idToken;

      if (!showLogin) registerUser(displayNameInputRef, idToken);
        
      authCtx.login(idToken);
      history.replace("/home");
    } catch (error) {
      setHasError(error.message);
    }
  };

  return {
    isLoading,
    hasError,
    displayNameInputRef,
    emailInputRef,
    passwordInputRef,
    sendRequest
  };
};

export default useHttp;
