import { useState } from "react";
import "../App.css";

// YT Tutorial - https://www.youtube.com/watch?v=WkREeDy2WQ4

function Tabs() {

    const [toggleState, setToggleState] = useState(1);
    const [contentState, setContentState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
        setContentState(index);
    }

    return(
        <div className="container">

            <div className="bloc-tabs">
                <button className={ toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>Home</button>
                <button className={ toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>Menu</button>
                <button className={ toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>Orders</button> {/* Should only display if login === true (Not yet implemented) */}
            </div>

            <div className="content-tabs">
                <div className={ contentState === 1 ? "content active-content" : "content"}>
                    <h2>Home</h2>
                    <hr />
                    <p>Some shit about Cheeseburgers... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

                <div className={ contentState === 2 ? "content active-content" : "content"}>
                    <h2>Menu</h2>
                    <hr />
                    <p>Menu coming soon...</p>
                </div>

                <div className={ contentState === 3 ? "content active-content" : "content"}>
                    <h2>Orders</h2>
                    <hr />
                    <p>order list and tracking coming soon</p>
                </div>


            </div>
        </div>
    )
}

export default Tabs;