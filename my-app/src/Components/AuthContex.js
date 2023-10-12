import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [order, setOrder] = useState({
        total: 0,
        status: "pending",
        items: [],
    })

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName, order, setOrder }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};