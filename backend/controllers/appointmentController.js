import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import User from "../models/User.js"
import { sendAppointmentConfirmation } from "../utils/mailer.js";

// CREATE APPOINTMENT & GENERATE RAZORPAY ORDER
export const createAppointment = async (req, res) => {
  try {
    const { doctor, date, time } = req.body;
    const { name: patientName, email } = req.user; // Use authenticated user

    if (!doctor || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const doctorData = await Doctor.findById(doctor);
    if (!doctorData) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check for already booked slot
    const existing = await Appointment.findOne({
      doctor,
      date,
      time,
      status: { $ne: "cancelled" },
    });
    if (existing) {
      return res.status(400).json({ message: "This slot is already booked" });
    }

    const fee = doctorData.fee || 500;

    // Create Razorpay order
    const options = {
      amount: fee * 100, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      razorpayOrder,
      appointmentInfo: {
        doctor,
        patientName,
        email,
        date,
        time,
        fee,
      },
      razorpayKey: process.env.RAZORPAY_KEY_ID, // public key
    });
  } catch (err) {
    console.error("Error creating appointment/order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// VERIFY PAYMENT & CONFIRM APPOINTMENT
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentData } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !appointmentData) {
      return res.status(400).json({ message: "Missing payment or appointment data" });
    }

    // Check if payment already verified
    const existingPayment = await Appointment.findOne({ razorpayOrderId: razorpay_order_id });
    if (existingPayment) {
      return res.status(400).json({ message: "Payment already verified for this order" });
    }

    // Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Save appointment
    const appointment = await Appointment.create({
      doctor: appointmentData.doctor,
      patientName: appointmentData.patientName,
      email: appointmentData.email,
      date: appointmentData.date,
      time: appointmentData.time,
      fee: appointmentData.fee,
      status: "confirmed",
      isPaid: true,
      paidAt: new Date(),
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    // Populate doctor name for email
    await appointment.populate("doctor", "name email");

    // Optional: send confirmation email
    if (sendAppointmentConfirmation) {
      await sendAppointmentConfirmation({
        to: appointmentData.email,
        patientName: appointmentData.patientName,
        doctorName: appointment.doctor.name,
        date: appointmentData.date,
        time: appointmentData.time,
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment confirmed and payment verified",
      appointment: {
        id: appointment._id,
        doctor: appointment.doctor.name,
        date: appointment.date,
        time: appointment.time,
        isPaid: appointment.isPaid,
      },
    });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
