import { useState } from "react";
import "../App.css";
import { useAuth } from "./AuthContex";
import Menu from "./Menu";
import Orders from "./Orders";

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
                    <img className="home-banner" src="I Love Cheeseburgers Banner.png" alt="I Love Cheeseburgers Banner" />
                    <img className="img-header" src="home.png" alt="Home" />
                    {!isLoggedIn && (<>
                        <p1>Welcome Fellow Cheeseburger Lovers!</p1>
                        <br />
                        <p1>
                            Please register and login to place an order for delicious Cheeseburgers. Happy borgering.
                        </p1>

                        <p2>
                            Welcome to 'I Love Cheeseburgers,' where we transform your love for cheeseburgers into a delightful online dining experience. Our platform is not just a food ordering website; it's a celebration of the irresistible combination of juicy patties, melted cheese, and delectable toppings. We understand the profound joy that a perfectly crafted cheeseburger brings, and we're here to make that joy easily accessible to you.
                        </p2>
                        <p2>
                            At 'I Love Cheeseburgers,' we've curated a diverse menu of mouthwatering cheeseburgers, from classic favorites to inventive creations that push the boundaries of flavor. Our commitment is to deliver a seamless and convenient food ordering process, ensuring that your cheeseburger cravings are satisfied with just a few clicks.
                        </p2>
                        <p2>
                            Why choose us? Because we're not just delivering meals; we're delivering an experience. With a user-friendly interface, swift delivery, and a dedication to quality, we aim to redefine your expectations of online food ordering. Join us on this culinary journey, where every cheeseburger is a celebration, and every bite is a testament to our shared love for this iconic dish. 'I Love Cheeseburgers' – where passion meets convenience, and every order is an ode to the timeless joy of savoring a cheeseburger.
                        </p2>
                        <br />
                        <div className="btn-container">
                            <button className="home-btn" onClick={() => toggleTab(2)}>Menu</button>
                        </div>
                    </>)}
                    {isLoggedIn && (
                        <>
                            <p1>Welcome, {userName}!</p1>
                            <br />
                            <p2>
                                Welcome to 'I Love Cheeseburgers,' where we transform your love for cheeseburgers into a delightful online dining experience. Our platform is not just a food ordering website; it's a celebration of the irresistible combination of juicy patties, melted cheese, and delectable toppings. We understand the profound joy that a perfectly crafted cheeseburger brings, and we're here to make that joy easily accessible to you.
                            </p2>
                            <p2>
                                At 'I Love Cheeseburgers,' we've curated a diverse menu of mouthwatering cheeseburgers, from classic favorites to inventive creations that push the boundaries of flavor. Our commitment is to deliver a seamless and convenient food ordering process, ensuring that your cheeseburger cravings are satisfied with just a few clicks.
                            </p2>
                            <p2>
                                Why choose us? Because we're not just delivering meals; we're delivering an experience. With a user-friendly interface, swift delivery, and a dedication to quality, we aim to redefine your expectations of online food ordering. Join us on this culinary journey, where every cheeseburger is a celebration, and every bite is a testament to our shared love for this iconic dish. 'I Love Cheeseburgers' – where passion meets convenience, and every order is an ode to the timeless joy of savoring a cheeseburger.
                            </p2>
                            <br />
                            <div className="btn-container">
                                <button className="home-btn" onClick={() => toggleTab(2)}>Menu</button>
                                <button className="home-btn" onClick={() => toggleTab(3)}>Orders</button>
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
                    <img className="img-header" src="Orders.png" alt="Orders"></img>
                    {contentState === 3 && <Orders />}
                </div>
            </div>
        </div>
    )
}

export default Tabs;