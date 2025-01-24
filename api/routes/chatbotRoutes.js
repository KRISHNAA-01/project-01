import express from 'express';
import { handleUserQuery } from '../controllers/chatbotController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/query', verifyToken,handleUserQuery);

export default router;
