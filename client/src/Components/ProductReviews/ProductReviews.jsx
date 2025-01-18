import React, { useEffect, useState } from "react";
import "./ProductReviews.css"; // Custom styling
// import React, { useEffect, useState } from "react";
import api from "../../Components/context/axios"; // Axios instance

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [newReview, setNewReview] = useState({ rating: 0, reviewText: "" });

  useEffect(() => {
    fetchReviewStats();
    fetchReviews();
  }, [productId]);

  const fetchReviewStats = async () => {
    try {
      const response = await api.get(`review/${productId}/stats`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching review stats:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(`review/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const { rating, reviewText } = newReview;
      await api.post(`review/${productId}`, { rating, reviewText });
      alert("Review submitted successfully!");
      setNewReview({ rating: 0, reviewText: "" });
      fetchReviewStats(); // Refresh stats
      fetchReviews(); // Refresh review list
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.message || "Error submitting review");
    }
  };

  return (
    <div className="product-reviews mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      <div className="stats mb-4">
        <p className="text-gray-700">
          <strong>Average Rating:</strong> {stats.averageRating} ★
        </p>
        <p className="text-gray-700">
          <strong>Total Reviews:</strong> {stats.totalReviews}
        </p>
      </div>

      {/* <form onSubmit={handleReviewSubmit} className="mb-6">
        <textarea
          placeholder="Write your review..."
          value={newReview.reviewText}
          onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
          className="w-full p-2 rounded-md border mb-2"
          required
        />
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
          className="p-2 rounded-md border"
          required
        >
          <option value="">Rate</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button
          type="submit"
          className="block mt-2 w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Submit Review
        </button>
      </form> */}

        
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review mb-3 p-3 border-b">
            <img
                src={review.user.avatar}
                // alt={${review.user.username}'s avatar}
                className="user-avatar"
              />
            <p className="font-semibold">{review.user.username}</p>
            <p className="text-gray-600">{review.reviewText}</p>
            <p className="text-yellow-500">★ {review.rating}</p>
            <p className="review-date">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReviews;
