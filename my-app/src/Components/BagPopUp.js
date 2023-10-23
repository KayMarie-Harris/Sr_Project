import React, { useState } from "react"
import { useAuth } from "./AuthContex";

function ShowBag() {

    const [showBag, setShowBag] = useState(false);
    const { order, setOrder } = useAuth();

    const handleShowBag = () => {
        setShowBag(true)
    }

    const handleHideBag = () => {
        setShowBag(false)
    }

    const handlePlaceOrder = async () => {
        console.log("Order stringfy:", JSON.stringify(order))
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
                <h1>My Bag</h1>
                <ul>
                    {order.items.map(item =>
                        <li>
                            {item.name} - ${(item.price).toFixed(2)}
                        </li>
                    )}
                </ul>
                <div className="bag-footer">
                    <ul>
                        <li>Total: {order.total}</li>
                        <li>Tax: tax free special :D</li>
                    </ul>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>}
        </>
    )
}

export default ShowBag;