import express from "express";
import upload from "../config/multerConfig.js";  // your new multer config for Cloudinary
import { createDoctor, getAllDoctors, getDoctorById, searchBySpecialize } from "../controllers/doctorController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, upload.single("profilePic"), createDoctor);
router.get("/all", getAllDoctors);
router.get("/:id", getDoctorById);
router.get("/search", searchBySpecialize);

export default router;
