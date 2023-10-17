import React, { createContext, useState, useContext, useEffect } from 'react';

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
        const authenticated = localStorage.getItem('authenticated');
        if (authenticated) {
          setIsLoggedIn(true)
        }
      }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName, order, setOrder }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};