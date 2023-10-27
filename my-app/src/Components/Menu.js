import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import menuItems from "../Assets/MenuAssets.ts";
import { useAuth } from "./AuthContex.js";

function Menu() {
    const [showItemModal, setShowItemModal] = useState(false);
    const [menuItem, setMenuItem] = useState(0);
    const { isLoggedIn, order, setOrder } = useAuth();

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
    };

    // useEffect to log order when it changes
    useEffect(() => {
        console.log(order);
    }, [order]);

    const handleAddToBag = (item, order, setOrder) => {
        setShowItemModal(false);

        const updatedOrder = {
            ...order,
            total: (parseFloat(order.total) + parseFloat(item.price)).toFixed(2),
            items: [...order.items, item]
        };

        setOrder(updatedOrder);
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
                    <p>Coming Soon!</p>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleAddToBag(menuItems[menuItem], order, setOrder)}>Add To Bag</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Menu;
