import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState({
        email: "",
        total: 0,
        status: "pending",
        items: [],
    })

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            setIsLoggedIn(true);

            const savedEmail = localStorage.getItem('email');
            setEmail(savedEmail);
            console.log(savedEmail);
            const savedUserName = localStorage.getItem('userName');
            setUserName(savedUserName);

            setOrder(prevOrder => ({
                ...prevOrder,
                email: savedEmail,
            }));
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        order,
        setOrder,
        email,
        setEmail
    }), [isLoggedIn, userName, order, email]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};