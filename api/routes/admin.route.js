// admin.route.js
import express from 'express';
import { addProduct, editProduct, deleteProduct, updateStock, getAllOrders, deleteOrder } from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/product', verifyToken, verifyAdmin, addProduct);
router.put('/product/:id', verifyToken, verifyAdmin, editProduct);
router.delete('/product/:id', verifyToken, verifyAdmin, deleteProduct);
// router.patch('/product/:id/stock', verifyToken, verifyAdmin, updateStock);
router.get('/all-orders', verifyToken, verifyAdmin, getAllOrders)
router.delete('/orders/:id', verifyToken, verifyAdmin, deleteOrder);

export default router;

