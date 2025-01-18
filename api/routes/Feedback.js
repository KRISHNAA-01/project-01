import express from "express";
import Feedback from "../models/Feedback.js"; // Assuming you've already set up the model

const router = express.Router();

// POST route to submit feedback
router.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const feedback = new Feedback({
      customerName: name,
      email: email,
      feedbackText: message,
    });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback." });
  }
});

export default router;
