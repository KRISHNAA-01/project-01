import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewText: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
