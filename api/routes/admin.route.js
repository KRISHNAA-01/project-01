// admin.route.js
import express from 'express';
import { addProduct, editProduct, deleteProduct, updateStock, getAllOrders, deleteOrder, updateThreshold,getAllUsers, getAllReviews,deleteReview , updateOrderStatus} from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/product', verifyToken, verifyAdmin, addProduct);
router.put('/product/:id', verifyToken, verifyAdmin, editProduct);
router.delete('/product/:id', verifyToken, verifyAdmin, deleteProduct);
 router.put('/product/:id/stock', verifyToken, verifyAdmin, updateStock);
router.get('/all-orders', verifyToken, verifyAdmin, getAllOrders)
router.delete('/orders/:id', verifyToken, verifyAdmin, deleteOrder);
router.put('/product/:id/threshold', verifyToken, verifyAdmin, updateThreshold);
// router.patch('/product/:id/stock', verifyToken, verifyAdmin, updateStockAndThreshold);

router.get('/users', verifyToken, verifyAdmin, getAllUsers); // Fetch all users
router.get('/reviews', verifyToken, verifyAdmin, getAllReviews); // Fetch all reviews
router.delete('/review/:id', deleteReview);


router.patch('/orders/:orderId', verifyToken, updateOrderStatus);

export default router;

