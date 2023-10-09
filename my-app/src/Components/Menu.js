import { Modal } from "react-bootstrap";
import { useState } from "react";

function Menu() {
    const [showItemModal, setShowItemModal] = useState(false);

    const handleShowItemModal = () => {
        setShowItemModal(true)
    }

    const handleHideItemModal = () => {
        setShowItemModal(false)
    }

    const handleAddToBag = () => {
        setShowItemModal(false)
        console.log("Add to Bag Not implemented")
    }

    return (
        <>
            <div className="menu">
                <div className="Burgers">
                    <h2>Burgers</h2>
                    <button onClick={handleShowItemModal}>Burger</button>
                </div>
                <div className="Sides">
                    <h2>Sides</h2>
                    <button>Fries</button>
                </div>
                <div className="Drinks">
                    <h2>Drinks</h2>
                    <button>Soda</button>
                </div>
            </div>

            <Modal className="item-modal" show={showItemModal} onHide={handleHideItemModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1>Item Name</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Add-Ons</h3>
                    <form>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                    </form>
                    <h3>Extras</h3>
                    <form>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                    </form>
                    <h3>Remove</h3>
                    <form>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleAddToBag}>Add To Bag</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Menu;