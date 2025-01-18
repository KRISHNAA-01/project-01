import React, { useEffect, useState } from "react";
import api from "../Components/context/axios";
import { Link } from "react-router-dom";
import Header from "../Components/Header/Header";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null); // Track expanded orders
  const [reviewData, setReviewData] = useState({}); // Store review data per product

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

  const handleReviewChange = (e, productId) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [productId]: { ...prevData[productId], [name]: value },
    }));
  };

  const handleReviewSubmit = async (e, productId) => {
    e.preventDefault();
    try {
      const { rating, reviewText } = reviewData[productId] || {};
      await api.post(
        `review/${productId}`,
        { rating, reviewText },
        { withCredentials: true }
      );
      alert("Review submitted successfully!");
      setReviewData((prevData) => ({
        ...prevData,
        [productId]: { rating: 0, reviewText: "" },
      }));
    } catch (error) {
      if (error.response && error.response.data.code === "ALREADY_REVIEWED") {
        alert("You have already reviewed this product.");
      } else if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("There was an error submitting your review.");
      }
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
                <span className="font-semibold">Date ordered:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Total:</span> ₹{order.totalAmount}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Payment Status:</span> Completed
              </p>
              <p className="text-gray-600">
  <span className="font-semibold">Order Status:</span> {order.status}
</p>
{order.status === "order dispatched" && order.expectedDeliveryDate && (
  <p className="text-gray-600">
    <span className="font-semibold">Expected Delivery Date:</span>{" "}
    {new Date(order.expectedDeliveryDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}
  </p>
)}

              
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
                  {order.cartItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <p>{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{item.price}</p>

                      {order.status === "Delivered" && !item.reviewed && (
                        <div>
                          <form
                            onSubmit={(e) => handleReviewSubmit(e, item.product)}
                            className="mt-2"
                          >
                            <textarea
                              name="reviewText"
                              value={reviewData[item.product]?.reviewText || ""}
                              onChange={(e) => handleReviewChange(e, item.product)}
                              placeholder="Write your review..."
                              className="w-full p-2 rounded-md border"
                              required
                            />
                            <div className="flex mt-2">
                              <select
                                name="rating"
                                value={reviewData[item.product]?.rating || ""}
                                onChange={(e) => handleReviewChange(e, item.product)}
                                className="w-1/2 p-2 rounded-md border"
                                required
                              >
                                <option value="">Rate</option>
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
                      )}
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
