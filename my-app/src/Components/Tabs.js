import { useState } from "react";
import "../App.css";
import { useAuth } from "./AuthContex";
import Menu from "./Menu";
import { Button } from "react-bootstrap";
import  ShowPopUp from "./LoginRegisterPopUp";

// YT Tutorial - https://www.youtube.com/watch?v=WkREeDy2WQ4

function Tabs() {

    const [toggleState, setToggleState] = useState(1);
    const [contentState, setContentState] = useState(1);
    const { isLoggedIn, userName } = useAuth();

    const toggleTab = (index) => {
        setToggleState(index);
        setContentState(index);
    }

    return (
        <div className="container">

            <div className="bloc-tabs">
                <button className={toggleState === 1 ? "active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Home</button>
                <button className={toggleState === 2 ? "active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Menu</button>
                {isLoggedIn && <button className={toggleState === 3 ? "active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Orders</button>}
            </div>

            <div className="content-tabs">
                <div className={contentState === 1 ? "content active-content" : "content"}>
                    <img  className="home-banner" src="I Love Cheeseburgers Banner.png" alt="I Love Cheeseburgers Banner" />
                    <img className="img-header" src="home.png" alt="Home" />
                    {!isLoggedIn && (<> 
                        <p1>Welcome Fellow Cheeseburger Lovers!</p1> 
                        <br />
                        <p2>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </p2>
                        <br />
                        <div className="btn-container">
                            <button className="home-btn" onClick={() => toggleTab(2)}>Menu</button>
                        </div>
                    </>)}
                    {isLoggedIn && (
                        <>
                            <p>Welcome, {userName}!</p>
                            <br />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.
                            </p>
                            <br />
                            <div className="btn-container">
                                <button className="home-btn" onClick={() => toggleTab(2)}>Menu</button>
                                <button className="home-btn" onClick={() => toggleTab(3)}>My Orders</button>
                            </div>
                        </>
                    )}
                </div>


                <div className={contentState === 2 ? "content active-content" : "content"}>
                    <img className="img-header" src="menu.png" alt="Menu" />
                    <img className="img-br" src="squiggle.png" />

                    <Menu />
                </div>

                <div className={contentState === 3 ? "content active-content" : "content"}>
                    <h1>Orders</h1>
                    <hr />
                    <p>No Order History</p>
                </div>
            </div>
        </div>
    )
}

export default Tabs;