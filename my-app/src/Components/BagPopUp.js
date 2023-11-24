import React, { useState } from "react"
import { useAuth } from "./AuthContex";

function ShowBag() {

    const [showBag, setShowBag] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const { order, setOrder, email } = useAuth();
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        cardHolderName: "",
        expiryDate: "",
        cvv: ""
    });

    const handleShowBag = () => {
        setShowBag(true)
    }

    const handleHideBag = () => {
        setShowBag(false)
    }

    const handleShowPayment = () => {
        setShowPayment(true);
    }

    const handleHidePayment = () => {
        setShowPayment(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({
            ...paymentInfo,
            [name]: value
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const { cardNumber, cardHolderName, expiryDate, cvv } = paymentInfo;

        if (cardNumber && cardHolderName && expiryDate && cvv) {
            try {
                const response = await fetch("http://157.245.213.41:5000/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(order)
                });
                if (response.ok) {
                    window.alert("Order Placed!");
                    setOrder({
                        email: email,
                        total: 0,
                        status: "pending",
                        items: []
                    });
                    setShowPayment(false);
                } else {
                    window.alert("Something went wrong, try again later");
                }
            } catch (error) {
                console.error("Error placing order:", error);
            }
        } else {
            window.alert("Please fill out all payment fields.");
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
                    <button onClick={handleShowPayment} className="place-order-btn">Checkout</button>
                </div>
            </div>}

            {showPayment && (
                <div className="payment-popup-background">
                    <div className="payment-popup">
                        <h3>Total Due: {((order.total * 0.08) + parseFloat(order.total)).toFixed(2)}</h3>
                        <form onSubmit={handlePlaceOrder}>
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input type="text" id="cardNumber" name="cardNumber" required onChange={handleInputChange} /><br />

                            <label htmlFor="cardHolderName">Cardholder Name:</label>
                            <input type="text" id="cardHolderName" name="cardHolderName" required onChange={handleInputChange} /><br />

                            <label htmlFor="expiryDate">Expiry Date:</label>
                            <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YYYY" required onChange={handleInputChange} /><br />

                            <label htmlFor="cvv">CVV:</label>
                            <input type="text" id="cvv" name="cvv" required onChange={handleInputChange} /><br />

                            <button type="button" onClick={handleHidePayment}>Cancel</button>
                            <button type="submit">Submit Payment</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ShowBag;