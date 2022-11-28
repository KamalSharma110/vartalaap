import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: null,
    login: () => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const isLoggedIn = !!token;

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider
            value={{
                token: token,
                isLoggedIn: isLoggedIn,
                login: login,
                logout: logout,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;