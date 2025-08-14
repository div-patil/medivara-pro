import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendContactEmail = async ({ name, email, message }) => {
  if (!name || !email || !message) {
    throw new Error("Name, email, and message are required");
  }
  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    console.log("✅ Contact email sent successfully");
  } catch (err) {
    console.error("❌ Failed to send contact email:", err);
    throw err;
  }
};

export const sendAppointmentConfirmation = async ({ to, patientName, doctorName, date, time }) => {
  if (!to || typeof to !== "string") throw new Error("Recipient email is missing");

  try {
    await transporter.sendMail({
      from: `"MediConnect" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Appointment Confirmation",
      html: `
        <h2>Appointment Request Received</h2>
        <p>Your ${patientName} appointment with <strong>Dr. ${doctorName}</strong> on <strong>${date}</strong> at <strong>${time}</strong> has been received.</p>
        <p>You’ll get a confirmation once it is approved.</p>
      `,
    });
    console.log("✅ Appointment email sent to", to);
  } catch (err) {
    console.error("❌ Failed to send appointment confirmation:", err);
    throw err;
  }
};

export const sendOtpEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"MediConnect" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `
        <h2>OTP Code</h2>
        <p>Your OTP code is <strong>${otp}</strong>.</p>
        <p>Please use this code to verify your appointment.</p>
      `,
    });
    console.log("OTP email sent successfully to", to);
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    throw err;
  }
};
