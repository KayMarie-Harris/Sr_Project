import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ShowLogin() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    return(
        <>
            <h1> I Love Cheeseburgers </h1>
            <Button variant="primary" onClick={handleShow}>Sign In</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>Forms Go here...</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>Sign In</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShowLogin;