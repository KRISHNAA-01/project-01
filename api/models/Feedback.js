import mongoose from "mongoose";

// Define the schema for feedback
const feedbackSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true, // Ensure customer name is provided
    },
    feedbackText: {
      type: String,
      required: true, // Ensure feedback text is provided
    },
    isApproved: {
      type: Boolean,
      default: false, // Feedback is initially unapproved
    },
    date: {
      type: Date,
      default: Date.now, // Automatically set the date when feedback is created
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a model based on the schema
const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback; // ES module export
