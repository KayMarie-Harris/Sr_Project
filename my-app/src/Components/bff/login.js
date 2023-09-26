import React, { useState } from 'react'

export function login(email, password) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://157.245.213.41:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            // error
        }
    };
}