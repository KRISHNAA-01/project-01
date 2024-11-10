import React, { useEffect, useState } from 'react';
import api from '../context/axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/all-orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders(orders.filter((order) => order._id !== id)); // Update state to remove deleted order
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">View Orders</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="p-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Order ID: {order._id}</h3>
                <p className="text-gray-500">User: {order.billingInfo.firstName} {order.billingInfo.lastName}</p>
              </div>
              <button
                onClick={() => toggleOrderDetails(order._id)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                {expandedOrder === order._id ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {expandedOrder === order._id && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-gray-600"><strong>Status:</strong> {order.status}</p>
                <p className="text-gray-600"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

                <h4 className="mt-4 font-semibold text-gray-800">User Info:</h4>
                <p className="text-gray-600">Email: {order.billingInfo.email}</p>
                <p className="text-gray-600">
                  Address: {order.billingInfo.address}, {order.billingInfo.state}, {order.billingInfo.country}, {order.billingInfo.zip}
                </p>
                <p className="text-gray-600">Mobile: {order.billingInfo.mobile}</p>

                <h4 className="mt-4 font-semibold text-gray-800">Cart Items:</h4>
                {order.cartItems.map((item, index) => (
                  <div key={index} className="ml-4 mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="text-gray-600">Product Name: {item.name}</p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                ))}

                <h4 className="mt-4 font-semibold text-gray-800">Payment Info:</h4>
                <p className="text-gray-600">Order ID: {order.paymentInfo.orderId}</p>
                <p className="text-gray-600">Payment ID: {order.paymentInfo.paymentId}</p>

                <button
                  onClick={() => deleteOrder(order._id)}
                  className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Delete Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
