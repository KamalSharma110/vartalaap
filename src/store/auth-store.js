import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: null,
    login: () => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const isLoggedIn = !!token;

    const login = (token) => {
        setToken(token);
        console.log(token);
    };

    const logout = () => {
        setToken(null);
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