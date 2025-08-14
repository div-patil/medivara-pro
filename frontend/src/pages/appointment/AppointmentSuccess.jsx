import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import successAnimation from "../../assets/success.json";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AppointmentSuccess = () => {
  const navigate = useNavigate();
  const appointment = useSelector((state) => state.appointment.appointmentInfo);

  if (!appointment) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        No appointment info available.
      </div>
    );
  }

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen "
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card className="w-full max-w-md p-4 rounded-2xl shadow-2xl border-none bg-green-600 text-white relative overflow-hidden">
        <CardHeader className="text-2xl font-bold text-center mb-1 tracking-tight">
          🎉 Appointment Confirmed
        </CardHeader>
          <Lottie 
          animationData={successAnimation}
          loop={true}
          autoplay={true}
          style={{ width: 200, height: 100, margin: "0 auto" }}
        />

        <CardDescription className="text-white text-md space-y-2 text-center">
          <p className="text-lg font-medium">Your appointment has been successfully booked!</p>

          <div className="mt-4 space-y-1">
            <p><strong>👨‍⚕️ Doctor:</strong> {appointment.doctor?.name}</p>
            <p><strong>🧑 Patient:</strong> {appointment.patientName}</p>
            <p><strong>📧 Email:</strong> {appointment.email}</p>
            <p><strong>📅 Date:</strong> {appointment.date}</p>
            <p><strong>⏰ Time:</strong> {appointment.time}</p>
            <p><strong>💰 Fee:</strong> ₹{appointment.fee}</p>
          </div>
        </CardDescription>

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => navigate('/')}
            className="rounded-full bg-white text-green-700 hover:bg-gray-100 font-semibold px-6 py-2 transition"
          >
            Return to Home
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AppointmentSuccess;
