import React, { useState } from "react"
import { useAuth } from "./AuthContex";

function ShowBag() {

    const [showBag, setShowBag] = useState(false);
    const { order, setOrder, email } = useAuth();

    const handleShowBag = () => {
        setShowBag(true)
    }

    const handleHideBag = () => {
        setShowBag(false)
    }

    const handlePlaceOrder = async () => {
        try {
            const response = await fetch('http://157.245.213.41:5000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            if (response.ok) {
                window.alert("Order Placed!");
                setOrder({
                    email: email,
                    total: 0,
                    status: "pending",
                    items: [],
                });
            } else {
                window.alert("Something went wrong, try again later");
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    return (
        <>
            {showBag ? (<button className="bag-button" onClick={handleHideBag}><img src="bag.png" alt="Bag" /></button>) :
                <button className="bag-button" onClick={handleShowBag}><img src="bag.png" alt="Bag" /></button>}

            {showBag && <div className="bag-container">
                <div className="bag-header">
                    <h1>My Bag</h1>
                </div>
                <ul>
                    {order.items.map(item => (
                        <li key={item.name}>
                            {item.name} - ${(item.price).toFixed(2)}
                            {item.mod.length > 0 && (
                                <ul>
                                    {item.mod.map(modification => (
                                        <li key={modification.name}>
                                            {modification.name} +${modification.priceAdjustment.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="bag-footer">
                    <ul>
                        <li>Total: ${parseFloat(order.total).toFixed(2)}</li>
                        <li>Tax: ${(order.total * .08).toFixed(2)}</li>
                    </ul>
                    <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
                </div>
            </div>}
        </>
    )
}

export default ShowBag;