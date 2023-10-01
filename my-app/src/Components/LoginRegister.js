import { useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ShowPopUp() {

    // const { isLoggedIn, login, logout } = useAuth();

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [phonenum, setPhonenum] = useState('');
    const [address, setAddress] = useState('');


    const handleCloseLogin = () => {
        setShowLogin(false);
    }

    const handleLogin = async () => {
        try {
            const loginInfo = {
                email: email,
                password: password,
            };

            console.log(loginInfo)

            const response = await fetch('http://157.245.213.41:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo),
            });

            if (response.ok) {
                console.log(response);
                setShowLogin(false);
                //login(true)
            }
            else {
                console.log(response);
            }
        } catch (error) {
            // error
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

    const handleRegister = async () => {
        try {

            const registerInfo = {
                name: fname,
                address: address,
                email: email,
                phoneNumber: phonenum,
                password: password,
            }

            const response = await fetch('http://157.245.213.41:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerInfo),
            });

            if (response.ok) {
                handleShowLogin
            }
            else {
                //setIsLoggedIn(false);
            }
        } catch (error) {
            // error
        }
    };

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
                                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
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
                                <input type="text" value={fname} placeholder="Name" onChange={(e) => setFname(e.target.value)}></input>
                                <input type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)}></input>
                                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                                <input type="text" value={phonenum} placeholder="Phone Number" onChange={(e) => setPhonenum(e.target.value)}></input>
                                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                                <input type="password" placeholder="Confirm Password"></input>
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