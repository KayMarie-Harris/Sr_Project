import { useState } from "react";
import "../App.css";

// YT Tutorial - https://www.youtube.com/watch?v=WkREeDy2WQ4

// listen for shit on port 5000

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
                    <p>All borgers come with Hepatitis C</p>
                </div>

                <div className={ contentState === 2 ? "content active-content" : "content"}>
                    <h2>Menu</h2>
                    <hr />
                    <p>gtfo</p>
                </div>

                <div className={ contentState === 3 ? "content active-content" : "content"}>
                    <h2>Orders</h2>
                    <hr />
                    <p>Your borger caught on fire</p>
                </div>


            </div>
        </div>
    )
}

export default Tabs;