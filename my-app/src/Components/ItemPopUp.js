import { Modal } from "react-bootstrap";

function ItemPopUp({ itemName, itemDescription, ItemPrice }) {
    return (
        <Modal className="item-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Add-Ons</h3>
                <form>
                    <input type="checkbox">Pickles</input>
                    <input type="checkbox">Cheese</input>
                    <input type="checkbox">Onions</input>
                </form>
                <h3>Extras</h3>
                <form>
                    <input type="checkbox">Ketchup</input>
                    <input type="checkbox">Mayo</input>
                    <input type="checkbox">Mustard</input>
                </form>
                <h3>Remove</h3>
                <form>
                    <input type="checkbox">Pickles</input>
                    <input type="checkbox">Cheese</input>
                    <input type="checkbox">Onions</input>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button>Add To Bag</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ItemPopUp;