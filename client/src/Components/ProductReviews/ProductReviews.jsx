import React, { useEffect, useState } from "react";
import "./ProductReviews.css"; // Custom styling

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/review/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-reviews">
      <h3>User Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews for this product yet.</p>
      ) : (
        reviews.map((review) => (
          <div className="review-card" key={review._id}>
            <div className="review-header">
            <img
                src={review.user.avatar}
                alt={`${review.user.username}'s avatar`}
                className="user-avatar"
              />
              <h4>{review.user.username}</h4>
              <span className="rating">
                {"⭐".repeat(review.rating)}{" "}
                <span className="rating-number">({review.rating}/5)</span>
              </span>
            </div>
            <p className="review-text">{review.reviewText}</p>
            <p className="review-date">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductReviews;
