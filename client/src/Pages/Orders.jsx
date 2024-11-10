import React, { useEffect, useState } from 'react';
import api from '../Components/context/axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null); // Track which order's products are toggled

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('order/orders', {
                    withCredentials: true,
                });
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const toggleProducts = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (loading) return <div className="text-center py-10">Loading orders...</div>;

    return (<>
    <Header/>
        <div className="orders container mx-auto p-6">
            
            <h2 className="text-3xl font-semibold text-center mb-6">Your Orders</h2>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div
                        key={order._id}
                        className="order bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-indigo-600">
                                Order ID: {order._id}
                            </h3>
                            <button
                                onClick={() => toggleProducts(order._id)}
                                className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                            >
                                {expandedOrder === order._id ? 'Hide Details' : 'Show Details'}
                            </button>
                        </div>
                        <p className="text-gray-600">
                            <span className="font-semibold">Total:</span> ₹{order.totalAmount}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Payment Status:</span> {order.status}
                        </p>
                        <div
                            className={`mt-4 space-y-3 ${
                                expandedOrder === order._id ? 'block' : 'hidden'
                            }`}
                        >
                            <p className="font-semibold text-lg text-teal-600">Billing Info</p>
                            <div className="text-gray-600">
                                <p>{order.billingInfo.firstName} {order.billingInfo.lastName}</p>
                                <p>{order.billingInfo.address}, {order.billingInfo.state}, {order.billingInfo.country}</p>
                                <p>{order.billingInfo.zip}</p>
                                <p>{order.billingInfo.email}</p>
                                <p>{order.billingInfo.mobile}</p>
                            </div>
                            <p className="font-semibold text-lg text-teal-600">Cart Items</p>
                            <div className="space-y-2">
                                {order.cartItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition"
                                    >
                                        <p>{item.name}</p>
                                        <p>Qty: {item.quantity}</p>
                                        <p>₹{item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            ) : (<>
            
                <p className="text-center text-gray-600">No orders found</p>
                <Link
          to="/"
        >
          <p           className="text-center text-blue-700 text-lg font-semibold underline hover:text-blue-900 transition"
          >← Return to Home</p>
        </Link>
            </>
            )}
        </div>
            </>
    );
};

export default Orders;
