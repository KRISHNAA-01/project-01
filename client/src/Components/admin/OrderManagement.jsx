// import React, { useEffect, useState } from 'react';
// import api from '../context/axios';

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);
//   const updateOrderStatus = async (orderId, status, expectedDeliveryDate) => {
//     try {
//       await api.patch(
//         `/admin/orders/${orderId}`,
//         { status, expectedDeliveryDate },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );
//       alert('Order status updated successfully!');
//       fetchOrders(); // Refresh orders
//     } catch (error) {
//       alert('Failed to update order status. Please try again.');
//       console.error('Error updating order status:', error);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await api.get('/admin/all-orders', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const deleteOrder = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this order?');
//     if (!confirmDelete) return;

//     try {
//       await api.delete(`/admin/orders/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setOrders(orders.filter((order) => order._id !== id)); // Update state to remove deleted order
//       alert('Order deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       alert('Failed to delete order. Please try again.');
//     }
//   };

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">View Orders</h2>
//       <div className="grid gap-4">
//         {orders.map((order) => (
//           <div key={order._id} className="p-4 bg-white shadow-lg rounded-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700">Order ID: {order._id}</h3>
//                 <p className="text-gray-500">User: {order.billingInfo.firstName} {order.billingInfo.lastName}</p>
//                 <p className="text-gray-600">
//                 <span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString('en-GB', {
//                    day: '2-digit',
//                    month: 'long',
//                    year: 'numeric'
//                    })}
//                 </p>

//               </div>
//               <button
//                 onClick={() => toggleOrderDetails(order._id)}
//                 className="text-blue-500 hover:text-blue-700 focus:outline-none"
//               >
//                 {expandedOrder === order._id ? 'Hide Details' : 'Show Details'}
//               </button>
//             </div>

//             {expandedOrder === order._id && (
//               <div className="mt-4 border-t border-gray-200 pt-4">
                
// // Inside the order details section
// <div>
//   <label>Status:</label>
//   <select
//     value={order.status}
//     onChange={(e) =>
//       updateOrderStatus(order._id, e.target.value, order.expectedDeliveryDate)
//     }
//   >
//     <option value="Order Initiated">Order Initiated</option>
//     <option value="order dispatched">Order Dispatched</option>
//     <option value="Delivered">Delivered</option>
//   </select>
//   {order.status === 'order dispatched' && (
//     <input
//       type="date"
//       onChange={(e) =>
//         updateOrderStatus(order._id, order.status, e.target.value)
//       }
//     />
//   )}
// </div>;
//                 <p className="text-gray-600"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

//                 <h4 className="mt-4 font-semibold text-gray-800">User Info:</h4>
//                 <p className="text-gray-600">Email: {order.billingInfo.email}</p>
//                 <p className="text-gray-600">
//                   Address: {order.billingInfo.address}, {order.billingInfo.state}, {order.billingInfo.country}, {order.billingInfo.zip}
//                 </p>
//                 <p className="text-gray-600">Mobile: {order.billingInfo.mobile}</p>

//                 <h4 className="mt-4 font-semibold text-gray-800">Cart Items:</h4>
//                 {order.cartItems.map((item, index) => (
//                   <div key={index} className="ml-4 mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
//                     <p className="text-gray-600">Product Name: {item.name}</p>
//                     <p className="text-gray-600">Price: ₹{item.price}</p>
//                     <p className="text-gray-600">Quantity: {item.quantity}</p>
//                   </div>
//                 ))}

//                 <h4 className="mt-4 font-semibold text-gray-800">Payment Info:</h4>
//                 <p className="text-gray-600">Order ID: {order.paymentInfo.orderId}</p>
//                 <p className="text-gray-600">Payment ID: {order.paymentInfo.paymentId}</p>

//                 <button
//                   onClick={() => deleteOrder(order._id)}
//                   className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
//                 >
//                   Delete Order
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderManagement;


import React, { useEffect, useState } from "react";
import api from "../context/axios";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [expectedDates, setExpectedDates] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/admin/all-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, status, expectedDeliveryDate) => {
    if (status === "order dispatched" && !expectedDeliveryDate) {
      alert("Expected delivery date is required for order dispatch");
      return;
    }
    try {
      await api.patch(
        `/admin/orders/${orderId}`,
        { status, expectedDeliveryDate },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Order status updated successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(orders.filter((order) => order._id !== id));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
    const sortedOrders = [...orders];
    if (e.target.value === "date-asc") {
      sortedOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (e.target.value === "date-desc") {
      sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (e.target.value === "name-asc") {
      sortedOrders.sort((a, b) =>
        a.billingInfo.firstName.localeCompare(b.billingInfo.firstName)
      );
    } else if (e.target.value === "name-desc") {
      sortedOrders.sort((a, b) =>
        b.billingInfo.firstName.localeCompare(a.billingInfo.firstName)
      );
    }
    setOrders(sortedOrders);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchQuery) ||
      `${order.billingInfo.firstName} ${order.billingInfo.lastName}`
        .toLowerCase()
        .includes(searchQuery)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">View Orders</h2>

      {/* Search and Sort */}
      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search by order ID or user name"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded-lg flex-grow"
        />
        <select
          value={sortOption}
          onChange={handleSort}
          className="p-2 border rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="date-asc">Date (Oldest to Newest)</option>
          <option value="date-desc">Date (Newest to Oldest)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      {/* Order List */}
      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="p-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Order ID: {order._id}
                </h3>
                <p className="text-gray-500">
                  User: {order.billingInfo.firstName} {order.billingInfo.lastName}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-500">Status: {order.status}</p>
                {order.expectedDeliveryDate && (
                  <p className="text-gray-500">
                    Expected Delivery Date:{" "}
                    {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={() =>
                  setExpandedOrder(expandedOrder === order._id ? null : order._id)
                }
                className="text-blue-500 hover:text-blue-700"
              >
                {expandedOrder === order._id ? "Hide Details" : "Show Details"}
              </button>
            </div>

            {expandedOrder === order._id && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                {/* Status Update */}
                <label>Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => {
                    const status = e.target.value;
                    updateOrderStatus(order._id, status, expectedDates[order._id]);
                  }}
                  className="border rounded px-2 py-1"
                >
                  <option value="Order Initiated">Order Initiated</option>
                  <option value="order dispatched">Order Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>

                {order.status === "order dispatched" && (
                  <div className="mt-2">
                    <label>Expected Delivery Date:</label>
                    <input
                      type="date"
                      value={expectedDates[order._id] || ""}
                      onChange={(e) =>
                        setExpectedDates((prev) => ({
                          ...prev,
                          [order._id]: e.target.value,
                        }))
                      }
                      className="border rounded px-2 py-1"
                    />
                  </div>
                )}

                <button
                  onClick={() =>
                    updateOrderStatus(order._id, order.status, expectedDates[order._id])
                  }
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>

                <p className="text-gray-600 mt-2">
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>

                <h4 className="mt-4 font-semibold text-gray-800">User Info:</h4>
                <p className="text-gray-600">Email: {order.billingInfo.email}</p>
                <p className="text-gray-600">
                  Address: {order.billingInfo.address}, {order.billingInfo.state},{" "}
                  {order.billingInfo.country}, {order.billingInfo.zip}
                </p>
                <p className="text-gray-600">Mobile: {order.billingInfo.mobile}</p>

                <h4 className="mt-4 font-semibold text-gray-800">Cart Items:</h4>
                {order.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="ml-4 mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <p className="text-gray-600">Product Name: {item.name}</p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                ))}
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
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





// import React, { useEffect, useState } from "react";
// import api from "../context/axios";

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [expectedDates, setExpectedDates] = useState({}); // Track expected delivery dates

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const response = await api.get('/admin/all-orders', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const updateOrderStatus = async (orderId, status, expectedDeliveryDate) => {
//     if (status === 'order dispatched' && !expectedDeliveryDate) {
//       alert('Expected delivery date is required for order dispatch');
//       return;
//     }
//     try {
//       await api.patch(
//         `/admin/orders/${orderId}`,
//         { status, expectedDeliveryDate },
//         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//       );
//       alert('Order status updated successfully!');
//       fetchOrders();
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update order status. Please try again.');
//     }
//   };
//     const deleteOrder = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this order?");
//     if (!confirmDelete) return;

//     try {
//       await api.delete(`/admin/orders/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setOrders(orders.filter((order) => order._id !== id));
//       alert("Order deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting order:", error);
//       alert("Failed to delete order. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">View Orders</h2>
//       <div className="grid gap-4">
//         {orders.map((order) => (
//           <div key={order._id} className="p-4 bg-white shadow-lg rounded-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-700">Order ID: {order._id}</h3>
//                 <p className="text-gray-500">
//                User: {order.billingInfo.firstName} {order.billingInfo.lastName}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Date:</strong>{" "}
//                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
//                     day: "2-digit",
//                    month: "long",
//                    year: "numeric",
//                  })}
//                </p>
//                 <p className="text-gray-500">Status: {order.status}</p>
//                 {order.expectedDeliveryDate && (
//                   <p className="text-gray-500">
//                     Expected Delivery Date: {new Date(order.expectedDeliveryDate).toLocaleDateString()}
//                   </p>
//                 )}
//               </div>
//               <button
//                 onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 {expandedOrder === order._id ? 'Hide Details' : 'Show Details'}
//               </button>
//             </div>

//             {expandedOrder === order._id && (
//               <div className="mt-4 border-t border-gray-200 pt-4">
//                 <label>Status:</label>
//                 <select
//                   value={order.status}
//                   onChange={(e) => {
//                     const status = e.target.value;
//                     updateOrderStatus(order._id, status, expectedDates[order._id]);
//                   }}
//                 >
//                   <option value="Order Initiated">Order Initiated</option>
//                   <option value="order dispatched">Order Dispatched</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>

//                 {order.status === 'order dispatched' && (
//                   <div className="mt-2">
//                     <label>Expected Delivery Date:</label>
//                     <input
//                       type="date"
//                       value={expectedDates[order._id] || ''}
//                       onChange={(e) =>
//                         setExpectedDates((prev) => ({ ...prev, [order._id]: e.target.value }))
//                       }
//                       className="border rounded px-2 py-1"
//                     />
//                   </div>
                  
//                 )}

//                 <button
//                   onClick={() =>
//                     updateOrderStatus(order._id, order.status, expectedDates[order._id])
//                   }
//                   className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Save
//                 </button>
//                 <p className="text-gray-600 mt-2">
//                    <strong>Total Amount:</strong> ₹{order.totalAmount}
//                  </p>
                 
//                  <h4 className="mt-4 font-semibold text-gray-800">User Info:</h4>
//                  <p className="text-gray-600">Email: {order.billingInfo.email}</p>
//                  <p className="text-gray-600">
//                    Address: {order.billingInfo.address}, {order.billingInfo.state},{" "}
//                    {order.billingInfo.country}, {order.billingInfo.zip}
//                  </p>
//                  <p className="text-gray-600">Mobile: {order.billingInfo.mobile}</p>

//                  <h4 className="mt-4 font-semibold text-gray-800">Cart Items:</h4>
//                  {order.cartItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="ml-4 mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50"
//                   >
//                     <p className="text-gray-600">Product Name: {item.name}</p>
//                     <p className="text-gray-600">Price: ₹{item.price}</p>
//                     <p className="text-gray-600">Quantity: {item.quantity}</p>
//                   </div>
//                 ))}
//                 <button
//                   onClick={() => deleteOrder(order._id)}
//                   className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
//                 >
//                   Delete Order
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderManagement;
