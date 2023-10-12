import ShowBag from "./BagPopUp";
import ShowPopUp from "./LoginRegisterPopUp";


function Header() {
    return (
        <>
            <img className="logo" src='burger.png' alt="happy borger" />
            <h1>I Love Cheeseburgers</h1>
            <ShowPopUp />
            <ShowBag />

        </>
    )
}

export default Header;