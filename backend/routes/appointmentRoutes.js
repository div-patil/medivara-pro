import express from 'express';
import { createAppointment, verifyPayment } from '../controllers/appointmentController.js';
import  protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/verify', protect, verifyPayment);
router.post('/create', protect, createAppointment);

export default router;
