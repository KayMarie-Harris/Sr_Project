// import React, { useEffect, useState } from 'react';
// import fetchOrdersByEmail from './Orders'; // Adjust the import path according to your project structure
// import { useAuth } from './AuthContex';

// function Orders() {
//     const { email } = useAuth();
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         async function getOrders() {
//             try {
//                 const response = await fetch('http://157.245.213.41:5000/order', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ email })
//                 });

//                 if (response.ok) {
//                     const orders = await response.json();
//                     setOrders(orders)
//                 } else {
//                     throw new Error('Failed to fetch orders');
//                 }
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//                 throw error;
//             }
//         }

//         getOrders();
//     }, []); // Empty dependency array ensures the effect runs once after the initial render

//     return (
//         <div className="order-list">
//             <h2>My Orders</h2>
//             <ul>
//                 {orders.map(order => (
//                     <li key={order.id}>
//                         Order ID: {order.id}, Total: {order.total}, Status: {order.status}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Orders;