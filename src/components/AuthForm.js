import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import Add from "../img/addAvatar.png";
import AuthContext from "../store/auth-store";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthForm = () => {
  let idToken;
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const displayNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const clickHandler = () => {
    setShowLogin((prevState) => (prevState = !prevState));
  };

  const sendRequest = async (url) => {
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

      if (!response.ok) {
        throw new Error("Something went wrong....");
      }

      const data = await response.json();
      idToken = data.idToken;

      if (!showLogin) {
        const displayName = displayNameInputRef.current.value;
        const storageRef = ref(storage, displayName);

        await uploadBytesResumable(
          storageRef,
          document.getElementById("avatar").files[0]
        );
        const downloadURL = await getDownloadURL(storageRef);

        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: idToken,
              displayName: displayName,
              photoUrl: downloadURL,
              returnSecureToken: true,
            }),
          }
        );

        const userData = await response.json();

        await setDoc(doc(db, "users", userData.localId), {
          displayName: userData.displayName,
          email: userData.email,
          photoUrl: userData.photoUrl,
          localId: userData.localId,
        });

        await setDoc(doc(db, "userChats", userData.localId), {});
      }

      authCtx.login(idToken);
      history.replace("/home");
    } catch (error) {
      setHasError(error.message);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (showLogin) {
      sendRequest(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU"
      );
    } else {
      sendRequest(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU"
      );
    }
  };

  return (
    <section className={classes["form-container"]}>
      <h1>Chat App</h1>
      <span>{`${showLogin ? "Login" : "Register"}`}</span>
      <form className={classes.form} onSubmit={submitHandler}>
        {!showLogin && (
          <input
            type="text"
            placeholder="display name"
            ref={displayNameInputRef}
          />
        )}
        <input type="email" placeholder="email" ref={emailInputRef} />
        <input type="password" placeholder="password" ref={passwordInputRef} />
        {!showLogin && (
          <React.Fragment>
            <input id="avatar" type="file" style={{ display: "none" }} />
            <label htmlFor="avatar">
              <img src={Add} alt="add avatar icon" />
              <span>Add an avatar</span>
            </label>
          </React.Fragment>
        )}
        {!isLoading && !hasError && (
          <button>{`${showLogin ? "Sign In" : "Sign Up"}`}</button>
        )}
        {isLoading && <p>Sending Request...</p>}
        {hasError && <p>{hasError}</p>}
      </form>

      <div className={classes["toggle-container"]}>
        <span>{`${
          showLogin ? "You don't have an account?" : "You do have an account?"
        }`}</span>
        <button onClick={clickHandler}>
          {`${showLogin ? "Register" : "LogIn"}`}
        </button>
      </div>
    </section>
  );
};

export default AuthForm;
