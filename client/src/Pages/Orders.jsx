// import React, { useEffect, useState } from 'react';
// import api from '../Components/context/axios';
// import { Link } from 'react-router-dom';
// import Header from '../Components/Header/Header';

// const Orders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [expandedOrder, setExpandedOrder] = useState(null); // Track which order's products are toggled

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await api.get('order/orders', {
//                     withCredentials: true,
//                 });
//                 setOrders(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//                 setLoading(false);
//             }
//         };
//         fetchOrders();
//     }, []);

//     const toggleProducts = (orderId) => {
//         setExpandedOrder(expandedOrder === orderId ? null : orderId);
//     };

//     if (loading) return <div className="text-center py-10">Loading orders...</div>;

//     return (<>
//     <Header/>
//         <div className="orders container mx-auto p-6">
            
//             <h2 className="text-3xl font-semibold text-center mb-6">Your Orders</h2>
//             {orders.length > 0 ? (
//                 orders.map((order) => (
//                     <div
//                         key={order._id}
//                         className="order bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow"
//                     >
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-xl font-bold text-indigo-600">
//                                 Order ID: {order._id}
//                             </h3>
//                             <button
//                                 onClick={() => toggleProducts(order._id)}
//                                 className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
//                             >
//                                 {expandedOrder === order._id ? 'Hide Details' : 'Show Details'}
//                             </button>
//                         </div>
//                         <p className="text-gray-600">
//                             <span className="font-semibold">Total:</span> ₹{order.totalAmount}
//                         </p>
//                         <p className="text-gray-600">
//                             <span className="font-semibold">Payment Status:</span> {order.status}
//                         </p>
//                         <p className="text-gray-600">
//   <span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'long',
//     year: 'numeric'
//   })}
// </p>

//                         <div
//                             className={`mt-4 space-y-3 ${
//                                 expandedOrder === order._id ? 'block' : 'hidden'
//                             }`}
//                         >
//                             <p className="font-semibold text-lg text-teal-600">Billing Info</p>
//                             <div className="text-gray-600">
//                                 <p>{order.billingInfo.firstName} {order.billingInfo.lastName}</p>
//                                 <p>{order.billingInfo.address}, {order.billingInfo.state}, {order.billingInfo.country}</p>
//                                 <p>{order.billingInfo.zip}</p>
//                                 <p>{order.billingInfo.email}</p>
//                                 <p>{order.billingInfo.mobile}</p>
//                             </div>
//                             <p className="font-semibold text-lg text-teal-600">Cart Items</p>
//                             <div className="space-y-2">
//                                 {order.cartItems.map((item, idx) => (
//                                     <div
//                                         key={idx}
//                                         className="flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition"
//                                     >
//                                         <p>{item.name}</p>
//                                         <p>Qty: {item.quantity}</p>
//                                         <p>₹{item.price}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             ) : (<>
            
//                 <p className="text-center text-gray-600">No orders found</p>
//                 <Link
//           to="/"
//         >
//           <p           className="text-center text-blue-700 text-lg font-semibold underline hover:text-blue-900 transition"
//           >← Return to Home</p>
//         </Link>
//             </>
//             )}
//         </div>
//             </>
//     );
// };

// export default Orders;
import React, { useEffect, useState } from "react";
import api from "../Components/context/axios";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null); // Track expanded orders
  const [reviewData, setReviewData] = useState({
    productId: "",
    rating: 0,
    reviewText: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("order/orders", {
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
    setExpandedOrder(expandedOrder === orderId ? null : orderId); // Toggle order details
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleReviewSubmit = async (e, productId) => {
    e.preventDefault();
    console.log("Submitting review for product:", productId); // Add this line
    try {
      await api.post(`review/${productId}`, {
         withCredentials:true,
        // userId: "userId", // You may fetch userId from context or authentication system
        rating: reviewData.rating,
        reviewText: reviewData.reviewText,
      });
      alert("Review submitted successfully!");
      setReviewData({ productId: "", rating: 0, reviewText: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting your review.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading orders...</div>;

  return (
    <>
      <Header />
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
                  {expandedOrder === order._id ? "Hide Details" : "Show Details"}
                </button>
              </div>
              <p className="text-gray-600">
                <span className="font-semibold">Total:</span> ₹{order.totalAmount}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Payment Status:</span> {order.status}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div
                className={`mt-4 space-y-3 ${
                  expandedOrder === order._id ? "block" : "hidden"
                }`}
              >
                <p className="font-semibold text-lg text-teal-600">Billing Info</p>
                <div className="text-gray-600">
                  <p>
                    {order.billingInfo.firstName} {order.billingInfo.lastName}
                  </p>
                  <p>
                    {order.billingInfo.address}, {order.billingInfo.state},{" "}
                    {order.billingInfo.country}
                  </p>
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

                      {/* Review Form for Each Product */}
                      <div>
                        <form
                          onSubmit={(e) => handleReviewSubmit(e, item.product)}
                          className="mt-2"
                        >
                          <textarea
                            name="reviewText"
                            value={reviewData.reviewText}
                            onChange={handleReviewChange}
                            placeholder="Write your review..."
                            className="w-full p-2 rounded-md border"
                          />
                          <div className="flex mt-2">
                            <select
                              name="rating"
                              value={reviewData.rating}
                              onChange={handleReviewChange}
                              className="w-1/2 p-2 rounded-md border"
                            >
                              <option value="0">Rate</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                            <button
                              type="submit"
                              className="w-1/2 bg-blue-500 text-white p-2 rounded-md ml-2"
                            >
                              Submit Review
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <p className="text-center text-gray-600">No orders found</p>
            <Link to="/">
              <p className="text-center text-blue-700 text-lg font-semibold underline hover:text-blue-900 transition">
                ← Return to Home
              </p>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Orders;
