import React, { useState } from "react";
import { useAuth } from "./AuthContex";
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

// Assuming you have set up your environment variables correctly
function ShowBag() {
    const [showBag, setShowBag] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const { order, setOrder, email } = useAuth();



    // Handler functions
    const MyPaymentForm = () => (
        <PaymentForm
            applicationId="{process.env.applicationId}"
            locationId="${process.env.locationId}"
            cardTokenizeResponseReceived={(token, buyer) => {
                // Handle the tokenized card information here
            }}
            // Add verification details if necessary
        >
            <CreditCard />
        </PaymentForm>
    );

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        try {
            const result = await tokenize();
            if (result.status === 'OK') {
                // Sending order to backend along with payment token
                const response = await fetch("YOUR_BACKEND_ENDPOINT", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...order, token: result.token })
                });

                if (response.ok) {
                    // Handle successful order placement
                } else {
                    // Handle errors
                }
            } else {
                // Handle payment tokenization failure
            }
        } catch (error) {
            // Handle any other errors
        }
    };

    return (
        <>
            {showPayment && (
                <div className="payment-popup-background">
                    <div className="payment-popup">
                        <h3>Total Due: {/*...*/}</h3>
                        <PaymentForm applicationId="YOUR_SQUARE_APPLICATION_ID" locationId="YOUR_SQUARE_LOCATION_ID">
                            <CreditCard />
                            <button type="button" onClick={/*...*/}>Cancel</button>
                            <button type="submit">Submit Payment</button>
                        </PaymentForm>
                    </div>
                </div>
            )}
        </>
    );

}

export default ShowBag;
