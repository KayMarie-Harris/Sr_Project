import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContex'; // Adjust the import path according to your project structure

function Orders() {
    const { email } = useAuth();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getOrders() {
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
        }

        getOrders();
    }, [email]);

    return (
        <div className="order-list">
            <h2 className="order-header">My Orders</h2>
            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
                <ul className="order-items">
                    {orders.map(order => (
                        <li key={order._id} className="order">
                            <div className="order-details">
                                <div>Order ID: {order._id}</div>
                                <div>Total: ${order.total}</div>
                                <div>Status: {order.status}</div>
                            </div>
                            <ul className="item-list">
                                {order.items.map(item => (
                                    <li key={item._id} className="item">
                                        <div>ID: {item._id}</div>
                                        <div>Item: {item.name}</div>
                                        <div>Price: ${item.price}</div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Orders;
