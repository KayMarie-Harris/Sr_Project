// import React, { useState } from 'react'

function Login() {
    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');

    //const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginInfo = { email: 'beanmail', password: 'password' };

    const handleLogin = async () => {
        try {
            console.log("line 13")
            const response = await fetch('http://157.245.213.41:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: loginInfo,
            });

            if (response.ok) {
                console.log(response);
                //setIsLoggedIn(true);
            }
            else {
                //setIsLoggedIn(false);
                console.log(response);
            }
        } catch (error) {
            // error
        }
    };
}

export default Login;