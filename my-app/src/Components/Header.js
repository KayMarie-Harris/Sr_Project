import ShowPopUp from "./LoginRegisterPopUp";


function Header() {
    return(
        <>
            <img className="logo" src='burger.png' alt="happy borger" />
            <h1>I Love Cheeseburgers</h1>
            <ShowPopUp/>
            <button className="bag-button"><img src="bag.png" alt="Bag"/></button>

        </>
    )
}

export default Header;