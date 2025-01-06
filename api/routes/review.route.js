import express from 'express';
import Review from '../models/review.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Fetch reviews for a product
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate('user', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Submit a review
router.post('/:productId',verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, reviewText } = req.body;
    const userId = req.user.id;
    console.log(userId);
    
    // Check if user purchased the product
    const orders = await Order.find({ user: userId, 'cartItems.product': productId });
    if (orders.length === 0) {
      return res.status(403).json({ message: 'You must purchase this product before reviewing it.' });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product.' });
    }

    // Create new review
    const review = new Review({ product: productId, user: userId, rating, reviewText });
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting review' });
  }
});

export default router;
