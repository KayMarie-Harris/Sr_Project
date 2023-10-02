import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./Banner";

function ShowPopUp() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleLogin = async () => {
        try {
            console.log("line 13")
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
                setLogin(true);
                console.log(successMsg);
                console.log(response)
            }
            else {
                setLogin(false);
                console.log("Login failed");
            }
        } catch (error) {
            handleCloseLogin();
            console.log("Err during login:", error);
        }
    };
    const handleCloseLogin = () => {
        setShowLogin(false);
    }
    const handleShowLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
    }
    const handleSignOut = () => {
        console.log("not implemented")
        setLogin(false)
    }

    const handleRegister = async () => {
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
            }
            else {
                setLogin(false);
                console.log("Registration failed");
            }
        } catch (error) {
            handleCloseRegister();
            console.log("Err during Registration:", error);
        }
    };
    const handleCloseRegister = () => {
        setShowRegister(false);
    }
    const handleShowRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
    }

    return (
        <>
           {!login && <button className="user-button" variant="primary" onClick={handleShowLogin}><img src="user.png" />Sign In</button>}
           { login && <button className="user-button" variant="primary" onClick={handleSignOut}><img src="user.png" />Sign Out</button> }
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