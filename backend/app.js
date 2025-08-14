// backend/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import connectDB from './config/db.js'
// import connectDB from "./backend/config/db.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();
connectDB();
// dotenv.config({ path: "../.env" });
const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);


// app.get("*", (req, res) => {
//   res.status(404).json({ message: "Route not found" });
// })


export default app;
