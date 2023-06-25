import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/auth-store";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const displayNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const sendRequest = async (url, showLogin) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('email', emailInputRef.current.value);
      formData.append('password', passwordInputRef.current.value);

      if (!showLogin){ 
        formData.append('name', displayNameInputRef.current.value);
        formData.append('image', document.getElementById("avatar").files[0]);
      }

      const response = await fetch(url, {
        method: "POST",
        // headers: { "Content-Type": "application/json" }, //should not set this header when sending multipart/form-data
        //otherwise we would get CORS error
        body: formData,
      });

      setIsLoading(false);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      if(showLogin) {
        await authCtx.login(data.token, data.userId);
        navigate("/home");
      }
      
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
    sendRequest,
  };
};

export default useHttp;
