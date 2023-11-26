import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import StripeCheckout from 'react-stripe-checkout';

function ShowBag() {
    const [showBag, setShowBag] = useState(false);
    const { order, setOrder, email } = useAuth();

    const handleShowBag = () => {
        setShowBag(true);
    };

    const handleHideBag = () => {
        setShowBag(false);
    };
    const stripeAmount = Math.round((order.total * 1.08) * 100);


    const stripePublishableKey = "pk_test_51OGGbhAd5Clit93lSELrRvEZkWwuG3qf01Loy2ibl9BJ9O4PzDM5Kf9NpizhNJ2i0DHM7LrNuwA4jl7qvPiXoBl300b6GetBeq";

    const onToken = async (token) => {
        try {
            console.log("check line 24 for setting orderTotal to stripe amount");
            const orderData = {
                ...order,
                token: token, // Include the Stripe token in the order data
                email: email,
                stripeTotal: stripeAmount
            };

            const response = await fetch("https://157.245.213.41:5000/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                window.alert("Order Placed!");
                setOrder({
                    email: email,
                    total: 0,
                    status: "pending",
                    items: []
                });
                setShowBag(false);
            } else {
                window.alert("Something went wrong, try again later");
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    return (
        <>
            {showBag ? (
                <button className="bag-button" onClick={handleHideBag}>
                    <img src="bag.png" alt="Bag" />
                </button>
            ) : (
                <button className="bag-button" onClick={handleShowBag}>
                    <img src="bag.png" alt="Bag" />
                </button>
            )}

            {showBag && (
                <div className="bag-container">
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
                            <li>Tax: ${(order.total * 0.08).toFixed(2)}</li>
                        </ul>
                        <StripeCheckout
                            token={onToken}
                            stripeKey={stripePublishableKey}
                            amount={stripeAmount} // Convert to cents
                            currency="USD"
                            email={email}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default ShowBag;
