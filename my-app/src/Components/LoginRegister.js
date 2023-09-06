import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ShowLogin() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    return(
        <>
            <button variant="primary" onClick={handleShow}>Sign In</button>
            <div className= {show? "login-modal-show" : "login-modal-hide"}>
                <Modal className="login-modal" show={show} onHide={handleClose}>
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
                        <a href="">New? Register Now!</a>

                        <button onClick={handleClose}>
                            Cancel
                        </button>
                        <button onClick={handleClose}>Sign In</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default ShowLogin;