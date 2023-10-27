import ShowBag from "./BagPopUp";
import ShowPopUp from "./LoginRegisterPopUp";


function Header() {
    return (
        <>
            <img className="logo" src='burger.png' alt="happy borger" />
            <img className="site-name" src='I Love Cheeseburgers.png' alt="I Love Cheeseburgers" />
            <ShowPopUp />
            <ShowBag />

        </>
    )
}

export default Header;