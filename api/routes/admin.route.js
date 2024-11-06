// admin.route.js
import express from 'express';
import { addProduct, editProduct, deleteProduct, updateStock } from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.post('/product', verifyToken, verifyAdmin, addProduct);
router.put('/product/:id', verifyToken, verifyAdmin, editProduct);
router.delete('/product/:id', verifyToken, verifyAdmin, deleteProduct);
// router.patch('/product/:id/stock', verifyToken, verifyAdmin, updateStock);

export default router;

