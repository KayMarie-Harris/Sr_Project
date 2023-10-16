import { useState } from "react";
import "../App.css";
import { useAuth } from "./AuthContex";
import Menu from "./Menu";

// YT Tutorial - https://www.youtube.com/watch?v=WkREeDy2WQ4

function Tabs({ isLoggedIn, onLogin, onLogout }) {

    const [toggleState, setToggleState] = useState(1);
    const [contentState, setContentState] = useState(1);
    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAuth();

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
                    <h1>Home</h1>
                    <hr />
                    {!isLoggedIn && <p>Welcome Fellow Cheeseburger Lovers!</p>}
                    {isLoggedIn && <p>Welcome, {userName}!</p>}
                </div>

                <div className={contentState === 2 ? "content active-content" : "content"}>
                    <h1>Menu</h1>
                    <hr />
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