import React, { useEffect, useState } from "react";
import { useAdmin } from "../context/AdminContext";

const AdminReviews = () => {
  const { deleteReview, loading, error, fetchReviews } = useAdmin();
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); // Newest, A-Z, rating
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      const data = await fetchReviews();
      setReviews(data || []);
    };
    getReviews();
  }, [fetchReviews]);

  // Sorting functionality
  const sortedReviews = () => {
    let sorted = [...reviews];

    if (sortOption === "newest") {
      sorted = sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "oldest") {
      sorted = sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === "rating") {
      sorted = sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "a-z") {
      sorted = sorted.sort((a, b) => a.product?.name.localeCompare(b.product?.name));
    }

    return sorted;
  };

  // Filter functionality
  const filteredReviews = sortedReviews().filter((review) => {
    return (
      review.product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.user?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewText.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const response = await deleteReview(id);
      if (response) {
        alert("Review deleted successfully");
        // Optionally refresh the reviews list here
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Reviews</h2>

      {/* Search Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search reviews..."
          className="p-2 border border-gray-300 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Sorting Options */}
      <div className="mb-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="rating">Highest to Lowest Rating</option>
          <option value="a-z">A-Z (Product Name)</option>
        </select>
      </div>

      {/* Display Reviews */}
      <ul className="space-y-2">
        {filteredReviews.map((review) => (
          <li key={review._id} className="border p-4 rounded shadow">
            <p>
              <strong>Username:</strong> {review.user?.username}
            </p>
            <p>
              <strong>Product:</strong> {review.product?.name}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating} / 5
            </p>
            <p>
              <strong>Review:</strong> {review.reviewText}
            </p>
            <p>
              <strong>Date:</strong> {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleDelete(review._id)}
              className="text-red-500 mt-2"
            >
              Delete Review
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReviews;
