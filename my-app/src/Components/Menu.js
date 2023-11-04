import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import menuItems from "../Assets/MenuAssets.ts";
import { useAuth } from "./AuthContex.js";
import burgerMods from "../Assets/BurgerModAssets.ts";
import friesMods from "../Assets/FriesModAssets.ts";
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
                    <button className="item-btn" onClick={handleShowItemModal(0)}><img src="borger.jpg" alt="burger"></img>Classic Burger</button>
                </div>
                <div className="Sides">
                    <h2>Sides</h2>
                    <button className="item-btn" onClick={handleShowItemModal(2)}><img src="fries.jpg" />French Fries</button>
                </div>
                <div className="Drinks">
                    <h2>Drinks</h2>
                    <button className="item-btn" onClick={handleShowItemModal(4)}><img src="soda.jpg" />Coca-Cola</button>
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

                        {(menuItems[menuItem].type === "fries") && friesMods.map((modification, index) => (
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
