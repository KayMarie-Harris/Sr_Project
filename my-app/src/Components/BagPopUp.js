import React, { useState } from "react";
import { useAuth } from "./AuthContex";
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

function ShowBag() {
    const [showBag, setShowBag] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const { order, setOrder, email } = useAuth();

    const handlePlaceOrder = async (token) => {
        // Call your backend with the token and order total to process payment
        try {
            const response = await fetch("http://157.245.213.41:5000/processPayment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token.token,
                    orderTotal: order.total // Include order total here
                })
            });

            if (response.ok) {
                // Handle successful order placement
                setOrder({ ... }); // Reset or update the order as needed
                setShowPayment(false);
            } else {
                // Handle errors from your backend
            }
        } catch (error) {
            // Handle any other errors
            console.error("Payment processing error:", error);
        }
    };

    return (
        <>
            {showPayment && (
                <div className="payment-popup-background">
                    <div className="payment-popup">
                        <h3>Total Due: {order.total.toFixed(2)}</h3>
                        <PaymentForm
                            applicationId={process.env.applicationId}
                            locationId={process.env.locationId}
                            cardTokenizeResponseReceived={handlePlaceOrder}
                        >
                            <CreditCard />
                            <button type="button" onClick={() => setShowPayment(false)}>Cancel</button>
                            <button type="submit">Submit Payment</button>
                        </PaymentForm>
                    </div>
                </div>
            )}
        </>
    );
}

export default ShowBag;
