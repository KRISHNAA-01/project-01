import React, { useState } from "react";
import FeedbackForm from "../Components/FeedbackForm";
import "./feedback.css";

const FeedbackPage = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNewFeedback = async (newFeedback) => {
    try {
      const response = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Feedback submitted successfully!");
        setErrorMessage(null);
      } else {
        setErrorMessage(data.message || "Error submitting feedback.");
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage("Error submitting feedback. Please try again later.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="feedback-page-container">
      <div className="feedback-container">
        <h1>Customer Feedback</h1>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <FeedbackForm onSubmit={handleNewFeedback} />
      </div>
    </div>
  );
};

export default FeedbackPage;
