import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';
import Add from '../img/addAvatar.png';
import AuthContext from '../store/auth-store';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/firebase';


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
        setShowLogin(prevState => prevState = !prevState);
    };

    const sendRequest = async (url) => {
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailInputRef.current.value,
                    password: passwordInputRef.current.value,
                    returnSecureToken: true
                }),
            });

            setIsLoading(false);

            if (!response.ok) {
                throw new Error('Something went wrong....');
            }

            const data = await response.json();
            idToken = data.idToken;

            authCtx.login(idToken);

            history.replace('/home');
        }
        catch (error) {
            setHasError(error.message);
        }

    };

    const submitHandler = event => {
        event.preventDefault();

        if (showLogin) {
            sendRequest('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU');
        }
        else {
            sendRequest('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU');

            const displayName = displayNameInputRef.current.value;
            const storageRef = ref(storage, displayName); //second argument is the path inside the firebase storage where this file will be uploaded

            uploadBytesResumable(storageRef, document.getElementById('avatar').files[0]).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {

                    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            idToken: idToken,
                            displayName: displayName,
                            photoUrl: downloadURL,
                            returnSecureToken: true
                        })
                    });
                    const data = await response.json(); //json() will turn this response in json format to a normal javascript object
                    console.log(data);
                });
            });
        }
    };

    return (
        <section className={classes['form-container']}>
            <h1>Chat App</h1>
            <span>{`${showLogin ? 'Login' : 'Register'}`}</span>
            <form className={classes.form} onSubmit={submitHandler}>
                {!showLogin && <input type='text' placeholder='display name' ref={displayNameInputRef} />}
                <input type='email' placeholder="email" ref={emailInputRef} />
                <input type='password' placeholder="password" ref={passwordInputRef} />
                {!showLogin &&
                    <React.Fragment>
                        <input id='avatar' type='file' style={{ display: "none" }} />
                        <label htmlFor='avatar'>
                            <img src={Add} alt='add avatar icon' />
                            <span>Add an avatar</span>
                        </label>
                    </React.Fragment>
                }
                {!isLoading && !hasError && <button>{`${showLogin ? 'Sign In' : 'Sign Up'}`}</button>}
                {isLoading && <p>Sending Request...</p>}
                {hasError && <p>{hasError}</p>}
            </form>

            <div className={classes['toggle-container']}>
                <span>{`${showLogin ? 'You don\'t have an account?' : 'You do have an account?'}`}</span>
                <button onClick={clickHandler}>
                    {`${showLogin ? 'Register' : 'LogIn'}`}
                </button>
            </div>
        </section>
    );
};

export default AuthForm;