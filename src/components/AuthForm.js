import React, { useState } from 'react';

import classes from './AuthForm.module.css';
import Add from '../img/addAvatar.png';

const AuthForm = () => {
    const [showLogin, setShowLogin] = useState(true);

    const clickHandler = () => {
        setShowLogin(prevState => prevState = !prevState);
    };

    return (
        <section className={classes['form-container']}>
            <h1>Chat App</h1>
            <span>{`${showLogin ? 'Login' : 'Register'}`}</span>
            <form className={classes.form}>
                {!showLogin && <input type='text' placeholder='display name' />}
                <input type='email' placeholder="email" />
                <input type='password' placeholder="password" />
                {!showLogin && 
                <React.Fragment>
                    <input id='avatar' type='file' style={{display: "none"}}/>
                    <label htmlFor='avatar'>
                        <img src={Add} alt='add avatar icon'/>
                        <span>Add an avatar</span>
                    </label>
                </React.Fragment>
                }
                <button>{`${showLogin ? 'Sign In' : 'Sign Up'}`}</button>
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