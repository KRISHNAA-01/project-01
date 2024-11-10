// routes/orderRoutes.js
import express from 'express';
import { createOrder,  } from '../controllers/order.controller.js';
import { createPaymentOrder, verifyPayment , getUserOrders} from '../controllers/payment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// // Route to place an order
// router.post('/place-order', verifyToken, createOrder);

// // Route to get all orders for the logged-in user
// router.get('/my-orders', verifyToken, getUserOrders);


// Payment routes
router.post('/create-payment-order', verifyToken, createPaymentOrder);
router.post('/verify-payment', verifyToken, verifyPayment);
router.get('/orders', verifyToken, getUserOrders )

export default router;
