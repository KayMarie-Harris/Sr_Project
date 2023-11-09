import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import menuItems from "../Assets/MenuAssets.ts";
import { useAuth } from "./AuthContex.js";
import burgerMods from "../Assets/BurgerModAssets.ts";
import sideMods from "../Assets/SideModAssets.ts";
import drinkMods from "../Assets/DrinkModAssets.ts";

function Menu() {
    const [showItemModal, setShowItemModal] = useState(false);
    const [menuItem, setMenuItem] = useState(0);
    const [selectedMods, setSelectedMods] = useState([]);
    const { isLoggedIn, order, setOrder } = useAuth();

    useEffect(() => {
        // Reset selectedMods to an empty array
        setSelectedMods([]);
    }, []);

    const handleShowItemModal = (num) => () => {
        if (!isLoggedIn) {
            window.alert("Login to start an order!")
            return
        }
        setMenuItem(num);
        setShowItemModal(true);
    };

    const handleHideItemModal = () => {
        setShowItemModal(false);
        setSelectedMods([]);
    };

    const handleModSelection = (e, modification) => {
        if (e.target.checked) {
            // If the checkbox is checked, add the selected modification to the state
            setSelectedMods([...selectedMods, modification]);
        } else {
            // If the checkbox is unchecked, remove the selected modification from the state
            setSelectedMods(selectedMods.filter(mod => mod.name !== modification.name));
        }
    };

    // useEffect to log order when it changes
    useEffect(() => {
        console.log(order);
    }, [order]);

    const handleAddToBag = (item, order, setOrder) => {
        setShowItemModal(false);

        const selectedModificationForItem = [...selectedMods];
        const selectedModificationPrices = selectedMods.map(modification => modification.priceAdjustment);
        const totalModPrice = selectedModificationPrices.reduce((acc, price) => acc + price, 0);

        const updatedItem = {
            ...item,
            mod: selectedModificationForItem,
        };

        const updatedOrder = {
            ...order,
            total: (parseFloat(order.total) + parseFloat(item.price) + totalModPrice).toFixed(2),
            items: [...order.items, updatedItem]
        };

        setOrder(updatedOrder);
        setSelectedMods([]);
    };

    return (
        <>
            <div className="menu">
                <div className="Burgers">
                    <h2>Burgers</h2>
                    <button className="item-btn" onClick={handleShowItemModal(0)}><img src="AI-Borger.png" alt="burger"></img>Classic Burger - ${menuItems[0].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(1)}><img src="AI-DoubleBorger.png" alt="double burger"></img>Double Burger - ${menuItems[1].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(2)}><img src="AI-BaconBorger.png" alt="bacon burger"></img>Bacon Burger - ${menuItems[2].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(3)}><img src="AI-EggBorger.png" alt="egg burger"></img>Egg Burger - ${menuItems[3].price}</button>
                </div>
                <div className="Sides">
                    <h2>Sides</h2>
                    <button className="item-btn" onClick={handleShowItemModal(4)}><img src="fries.jpg" alt="fries" />French Fries - ${menuItems[4].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(5)}><img src="AI-CheesyFries.png" alt="cheesy fries" />Cheesy Fries - ${menuItems[5].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(6)}><img src="AI-Rings.png" alt="onion rings" />Onion Rings - ${menuItems[6].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(7)}><img src="AI-Tots.png" alt="Tater Tots" />Tater Tots - ${menuItems[7].price}</button>
                </div>
                <div className="Drinks">
                    <h2>Drinks</h2>
                    <button className="item-btn" onClick={handleShowItemModal(10)}><img src="AI-Water.png" alt="water" />Water - ${menuItems[10].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(11)}><img src="soda.jpg" alt="Tea" />Iced Tea - ${menuItems[11].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(8)}><img src="AI-Cola.png" alt="Cola" />Cola - ${menuItems[8].price}</button>
                    <button className="item-btn" onClick={handleShowItemModal(9)}><img src="AI-Sprite.png" alt="Sprite" />Sprite - ${menuItems[9].price}</button>
                </div>
            </div>

            <Modal className="item-modal" show={showItemModal} onHide={handleHideItemModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1>{menuItems[menuItem].name}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>{menuItems[menuItem].description}</h5>
                    <h3>Modifications</h3>
                    <form>
                        {(menuItems[menuItem].type === "burger") && burgerMods.map((modification, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={modification.name}
                                        onChange={(e) => handleModSelection(e, modification)}
                                        checked={selectedMods.some(mod => mod.name === modification.name)}
                                    />
                                    {modification.name} (+${modification.priceAdjustment})
                                </label>
                            </div>
                        ))}

                        {(menuItems[menuItem].type === "side") && sideMods.map((modification, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={modification.name}
                                        onChange={(e) => handleModSelection(e, modification)}
                                        checked={selectedMods.some(mod => mod.name === modification.name)}
                                    />
                                    {modification.name} (+${modification.priceAdjustment})
                                </label>
                            </div>
                        ))}
                        {(menuItems[menuItem].type === "drink") && drinkMods.map((modification, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={modification.name}
                                        onChange={(e) => handleModSelection(e, modification)}
                                        checked={selectedMods.some(mod => mod.name === modification.name)}
                                    />
                                    {modification.name} (+${modification.priceAdjustment})
                                </label>
                            </div>
                        ))}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleAddToBag(menuItems[menuItem], order, setOrder)}>Add To Bag</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Menu;
