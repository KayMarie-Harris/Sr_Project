import { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./Banner";
import { useAuth } from "./AuthContex";

function ShowPopUp() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleLogin = async () => {
        // Validate email and password
        if (!email || !password) {
            setErrMsg("Email and password are required.");
            return;
        }
        try {
            const response = await fetch('http://157.245.213.41:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                setSuccessMsg(`Login Successful! Welcome`);
                handleCloseLogin();

                localStorage.setItem('authenticated', true)
                setIsLoggedIn(true);
                const responseObj = JSON.parse(response)
                // Get users name
                setUserName(responseObj.user.name);
            }
            else {
                localStorage.setItem('authenticated', false)
                setIsLoggedIn(false);
                setErrMsg("Email or Password is Incorrect")
                console.log(errMsg);
            }
        } catch (error) {
            localStorage.setItem('authenticated', false)
            handleCloseLogin();
            console.log("Err during login:", error);
        }
    };
    const handleCloseLogin = () => {
        setShowLogin(false);
        setEmail('');
        setPassword('');
        setErrMsg('');
        setSuccessMsg('');
    }
    const handleShowLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
        setErrMsg('');
    }
    const handleLogout = async () => {
        try {
            const response = await fetch('http://157.245.213.41:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                localStorage.setItem('authenticated', false)
                console.log("User logged out");
                setIsLoggedIn(false);
                setUserName('');
                setErrMsg('');
            }
            else {
                console.log("error signing out");
            }
        } catch (error) {
            console.log("Err during logout:", error);
        }
    };

    const handleRegister = async () => {
        if (confirmPassword !== password) {
            setErrMsg("Passwords do not match");
            return;
        }
        try {
            console.log("Try Register")
            const response = await fetch('http://157.245.213.41:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, address, email, phoneNumber, password }),
            });

            if (response.ok) {
                setSuccessMsg(`User Registered! Welcome`);
                setErrMsg('')
                console.log(successMsg)
            }
            else {
                setIsLoggedIn(false);
                if (userName === '' || address === '' || email === '' || phoneNumber === '' || password === '' || confirmPassword === '') {
                    setErrMsg("All fields are required")
                }
                else {
                    setErrMsg("Registration failed")
                }
                setSuccessMsg('')
                console.log(errMsg);
            }
        } catch (error) {
            handleCloseRegister();
            console.log("Err during Registration:", error);
        }
    };
    const handleCloseRegister = () => {
        setShowRegister(false);
        setErrMsg('');
    }
    const handleShowRegister = () => {
        setShowRegister(true);
        handleCloseLogin();
    }

    return (
        <>
            {!isLoggedIn && <button className="user-button-login" variant="primary" onClick={handleShowLogin}><img src="user.png" />Sign In</button>}
            {isLoggedIn && <button className="user-button-logout" variant="primary" onClick={handleLogout}><img src="user.png" />Sign Out</button>}
            {successMsg && <Banner message={successMsg} type="success" />}
            {errMsg && <Banner message={errMsg} type="error" />}
            <div className={showLogin ? "login-modal-show" : "login-modal-hide"}>
                <Modal className="login-modal" show={showLogin} onHide={handleCloseLogin}>
                    <div className="header-login-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h1>Sign In</h1>
                            </Modal.Title>
                        </Modal.Header>
                    </div>
                    <div className="body-login-modal">
                        <Modal.Body>
                            <form>
                                <p className="err">{errMsg}</p>
                                <p className="success">{successMsg}</p>
                                <input value={email} type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                                <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                            </form>
                        </Modal.Body>
                    </div>
                    <Modal.Footer>
                        <a onClick={handleShowRegister}>New? Register Now!</a>

                        <button onClick={handleCloseLogin}>
                            Cancel
                        </button>
                        <button onClick={handleLogin}>Sign In</button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className={showRegister ? "register-modal-show" : "register-modal-hide"}>
                <Modal className="register-modal" show={showRegister} onHide={handleCloseRegister}>
                    <div className="header-login-modal">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h1>Register</h1>
                            </Modal.Title>
                        </Modal.Header>
                    </div>
                    <div className="body-register-modal">
                        <Modal.Body>
                            <form>
                                <p className="err">{errMsg}</p>
                                <p className="success">{successMsg}</p>
                                <input value={name} type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                                <input value={address} type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}></input>
                                <input value={email} type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                                <input value={phoneNumber} type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}></input>
                                <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                                <input value={confirmPassword} type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                            </form>
                        </Modal.Body>
                    </div>
                    <Modal.Footer>
                        <a onClick={handleShowLogin}>Already have an account? Login!</a>

                        <button onClick={handleCloseRegister}>
                            Cancel
                        </button>
                        <button onClick={handleRegister}>Register</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default ShowPopUp;