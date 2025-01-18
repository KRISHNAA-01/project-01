import React, { useState } from "react";

const FeedbackForm = ({ onSubmit }) => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.name && feedback.email && feedback.message) {
      onSubmit(feedback); // Send the feedback to the parent component (which submits to backend)
      setFeedback({ name: "", email: "", message: "" }); // Clear form after submission
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={feedback.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={feedback.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Your Feedback"
        value={feedback.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
