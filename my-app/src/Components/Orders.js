import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContex'; // Adjust the import path according to your project structure

function Orders() {
    const { email } = useAuth();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const getOrders = async () => {
        try {
            const response = await fetch('http://157.245.213.41:5000/getAllOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const jsonString = await response.text();
                const ordersData = JSON.parse(jsonString);
                if (Array.isArray(ordersData)) {
                    setOrders(ordersData);
                } else {
                    console.error('Unexpected data format from the API:', ordersData);
                    setError('Unexpected data format from the API');
                }
            } else {
                throw new Error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders');
        }
    };

    const handleConfirmPickup = async (orderId) => {
        try {
            const response = await fetch('http://157.245.213.41:5000/pickUpOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId })
            });

            if (response.ok) {
                // Refresh orders after confirmation
                getOrders();
            } else {
                throw new Error('Failed to confirm pickup');
            }
        } catch (error) {
            console.error('Error confirming pickup:', error);
            setError('Failed to confirm pickup');
        }
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
    };

    useEffect(() => {
        getOrders();
    }, [email]);

    return (
        <div className="order-list">
            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <ul className="order-items">
                    {orders.map(order => (
                        <li key={order._id} className="order">
                            <div className="order-header" onClick={() => toggleOrderDetails(order._id)}>
                                <div><p1>Order ID: {order._id}</p1></div>
                                <div><p1>Total: ${order.total}</p1></div>
                                <div><p1>Status: {order.status}</p1></div>
                                {order.status !== 'completed' && (
                                    <button className='markComplete' onClick={() => handleConfirmPickup(order._id)}>Confirm Pickup</button>
                                )}
                            </div>
                            {expandedOrderId === order._id && (
                                <ul className="item-list">
                                    {order.items.map(item => (
                                        <li key={item._id} className="item">
                                            <div>
                                                <p>{item.name} - ${item.price.toFixed(2)}</p>
                                                {item.mods && item.mods.length > 0 && (
                                                    <div>
                                                        <ul>
                                                            {item.mods.map((modification, index) => (
                                                                <li key={index}>
                                                                    <p>{modification.name} - ${modification.priceAdjustment.toFixed(2)}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Orders;
