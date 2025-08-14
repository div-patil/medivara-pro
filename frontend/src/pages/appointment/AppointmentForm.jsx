import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { setAppointment } from '@/redux/appointmentSlice';
import { useNavigate } from 'react-router-dom';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const AppointmentForm = ({ doctorId, doctorName, doctorFee, availableSlots = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fixedTimeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "16:00", "17:00", "18:00", "19:00",
  ];

  const todayDate = new Date().toISOString().split("T")[0];

  const handlePaymentForm = async () => {
    

    setMessage('');

    if (loading) return; // prevent double click

    if (!token) return setMessage("⚠️ Please login to continue.");
    if (!patientName.trim() || !email.trim() || !date || !time) {
      return setMessage("⚠️ All fields are required.");
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) return setMessage("❌ Razorpay SDK failed to load.");

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/appointments/create`,
        {
          doctor: doctorId,
          patientName: patientName.trim(),
          email: email.trim(),
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     console.log("data=", data)
      const { razorpayOrder, appointmentInfo, razorpayKey } = data;
      console.log(razorpayKey)
      const rzp = new window.Razorpay({
        key: razorpayKey ,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "LocDOctor",
        description: `Appointment with Dr. ${doctorName}`,
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            const verify = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/appointments/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                appointmentData: appointmentInfo,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
             

            if (verify.data.success) {
              dispatch(setAppointment(data.appointmentInfo)); // ✅ Save in Redux
              // setMessage("✅ Payment successful. Appointment confirmed.");
              setPatientName('');
              setEmail('');
              setDate('');
              setTime('');
              navigate('/appointment-success');
            } else {
              setMessage("❌ Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification Error", err);
            setMessage("❌ Could not verify payment.");
          }
        },
        prefill: {
          name: patientName,
          email,
        },
        theme: {
          color: "#00B5C9",
        },
      });

      rzp.open();
    } catch (err) {
      console.error("Error during payment", err);
      setMessage(err?.response?.data?.message || "❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-950 border shadow-lg rounded-xl p-6 sm:p-8 max-w-full mx-auto text-black dark:text-white">
      <h2 className="text-3xl font-bold mb-2">📅 Book an Appointment</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Doctor: <strong className="text-[#00B5C9]">{doctorName}</strong> &bull; Fee: ₹{doctorFee}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-neutral-200 dark:bg-neutral-950 text-black dark:text-white"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-neutral-200 dark:bg-neutral-950 text-black dark:text-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            min={todayDate}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-neutral-200 dark:bg-neutral-950 text-black dark:text-white"
          />
        </div>
      </div>

      {/* Time Selection */}
      <div className="mt-6">
        <label className="block text-sm font-semibold mb-2">Choose Time</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {fixedTimeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setTime(slot)}
              disabled={availableSlots.length && !availableSlots.includes(slot)}
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium border transition-all
                ${time === slot
                  ? "bg-[#00B5C9] text-white border-[#00B5C9]"
                  : availableSlots.length && !availableSlots.includes(slot)
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    : "bg-neutral-200 dark:bg-neutral-950 text-black dark:text-white hover:bg-[#00B5C9] dark:hover:bg-[#00B5C9]"
                }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Optional: Fallback Select for Available Slots */}
      {availableSlots.length > 0 && (
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Available Slots</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-neutral-200 dark:bg-neutral-950 text-black dark:text-white"
          >
            <option value="">Select a slot</option>
            {availableSlots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Button */}
      <div className="mt-6">
        <Button
        variant="custom"
          onClick={handlePaymentForm}
          disabled={loading}
          className="w-full py-3 text-md font-semibold "
        >
          {loading ? "Processing..." : "Pay Appointment Fee"}
        </Button>
      </div>

      {message && (
        <p className="mt-4 text-center text-yellow-600 dark:text-yellow-400 text-sm font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default AppointmentForm;
