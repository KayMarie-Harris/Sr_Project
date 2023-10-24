import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [order, setOrder] = useState({
        total: 0,
        status: "pending",
        items: [],
    })

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        const userName = localStorage.getItem('userName');
        setUserName(userName);
    }, []);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        order,
        setOrder,
    }), [isLoggedIn, userName, order]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};