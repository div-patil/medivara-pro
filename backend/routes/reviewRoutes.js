import  protect  from "../middleware/authMiddleware.js";
import express from "express";
import { createReview, getReviewsByDoctorId } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:doctorId", protect, createReview);
router.get("/:doctorId", getReviewsByDoctorId);

export default router;
