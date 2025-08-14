import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  location: { type: String },
  fee: { type: Number, default: 500 }, // Default fee if not specified
  experience: { type: Number },
  availableDays: [String], // e.g., ["Monday", "Wednesday"]
  availableTime: String, // e.g., "10:00 AM - 5:00 PM"
  bio: String,
  profilePic: {
    url: String,
    filename: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
