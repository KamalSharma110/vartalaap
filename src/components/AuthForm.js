import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./AuthForm.module.css";
import Add from "../img/addAvatar.png";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true);

  const {
    displayNameInputRef,
    emailInputRef,
    passwordInputRef,
    isLoading,
    hasError,
    sendRequest,
  } = useHttp();

  const clickHandler = () => {
    setShowLogin((prevState) => (prevState = !prevState));
  };

  const showPasswordHandler = (event) => {
    const showPassword = event.target.checked;
    const el = document.querySelector('input[placeholder="password"]');

    if(showPassword)  el.setAttribute('type' ,'text');
    else  el.setAttribute('type', 'password');
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (showLogin) {
      sendRequest(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
        showLogin
      );
    } else {
      sendRequest(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
        showLogin
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
            required
          />
        )}

        <input type="email" placeholder="email" ref={emailInputRef} />
        <input type="password" placeholder="password" ref={passwordInputRef} />
        <input type="checkbox" id="show-password" onClick={showPasswordHandler}/>
        <label htmlFor="show-password" className={classes['show-password_label']}>Show Password</label>

        {!showLogin && (
          <React.Fragment>
            <input id="avatar" type="file" style={{ display: "none" }}/>
            <label htmlFor="avatar">
              <img src={Add} alt="add avatar icon" />
              <span>Add an avatar</span>
            </label>
          </React.Fragment>
        )}

        {!isLoading && (
          <button disabled={hasError ? true : false}>
            {`${showLogin ? "Sign In" : "Sign Up"}`}
          </button>
        )}

        {isLoading && <p>Sending Request...</p>}

        {hasError &&
          ReactDOM.createPortal(
            <Error errorMessage={hasError} />,
            document.getElementsByTagName("body")[0]
          )}
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
