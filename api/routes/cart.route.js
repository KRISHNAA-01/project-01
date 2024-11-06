// routes/cartRoutes.js
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'; // Use verifyToken middleware
import { getCart, increaseCartItem, decreaseCartItem, removeCartItem, addItemToCart } from '../controllers/cart.controller.js';

const router = express.Router();

// Protect all cart-related routes
router.get('/', verifyToken, getCart);
router.post('/increase/:id', verifyToken, increaseCartItem);
router.post('/decrease/:id', verifyToken, decreaseCartItem);
router.delete('/remove/:id', verifyToken, removeCartItem);
// cartRoutes.js
router.post('/add', verifyToken, addItemToCart);

export default router;
