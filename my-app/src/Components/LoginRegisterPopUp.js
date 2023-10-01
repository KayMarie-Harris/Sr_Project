import { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./bff/login";

function ShowPopUp() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleCloseLogin = () => {
        setShowLogin(false);
    }

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
                console.log("Login Successful!");
                setLogin(true);
            }
            else {
                setLogin(false);
                console.log("Login failed");
            }
        } catch (error) {
            console.log("Err during login:" );
        }
    };

    const handleShowLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
    }

    const handleCloseRegister = () => {
        setShowRegister(false);
    }
    const handleShowRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
    }

    return (
        <>
            <button className="user-button" variant="primary" onClick={handleShowLogin}><img src="user.png" />Sign In</button>
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
                                <input type="text" placeholder="Name"></input>
                                <input type="text" placeholder="Address"></input>
                                <input type="text" placeholder="Email"></input>
                                <input type="text" placeholder="Phone Number"></input>
                                <input type="password" placeholder="Password"></input>
                                <input type="password" placeholder="Confirm Password"></input>
                            </form>
                        </Modal.Body>
                    </div>
                    <Modal.Footer>
                        <a onClick={handleShowLogin}>Already have an account? Login!</a>

                        <button onClick={handleCloseRegister}>
                            Cancel
                        </button>
                        <button onClick={handleCloseRegister}>Register</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default ShowPopUp;