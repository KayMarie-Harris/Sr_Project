import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ShowPopUp() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => {
        setShowLogin(false);
    }
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

    return(
        <>
            <button variant="primary" onClick={handleShowLogin}>Sign In</button>
            <div className= {showLogin? "login-modal-show" : "login-modal-hide"}>
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
                                <input type="text" placeholder="Email"></input>
                                <input type="password" placeholder="Password"></input>
                            </form>
                        </Modal.Body>
                    </div>
                    <Modal.Footer>
                        <a onClick={handleShowRegister}>New? Register Now!</a>

                        <button onClick={handleCloseLogin}>
                            Cancel
                        </button>
                        <button onClick={handleCloseLogin}>Sign In</button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className= {showRegister? "register-modal-show" : "register-modal-hide"}>
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