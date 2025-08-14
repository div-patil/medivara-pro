import React, { useEffect, useState } from "react";
import axios from "axios";
import AppointmentForm from "../../pages/appointment/AppointmentForm";
import { useParams } from "react-router-dom";
import RatingForm from "../../pages/review/RatingForm";
import RatingList from "../../pages/review/RatingList";
import { Button } from "../ui/button";
import AppAlert from "@/pages/reusable/AppAlert";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null); // for showing success or error message

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/${id}`);
        setDoctor(res.data.doctor);
      } catch (error) {
        console.error("Failed to fetch doctor", error);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  // const handleBook = async () => {
  //   try {
  //     const user = localStorage.getItem("userId"); // Or from context if auth is setup
  //     const res = await axios.post('http://localhost:5000/api/appointments/create', {
  //       user,
  //       doctor: id,
  //       patientName,
  //       email,
  //       date,
  //       time,
  //     });

  //     setAlert({
  //       type: "success",
  //       title: "Appointment Booked",
  //       message: `Your appointment with Dr. ${doctor.name} has been successfully booked!`,
  //     });
  //   } catch (error) {
  //     console.error("Booking failed", error);
  //     setAlert({
  //       type: "error",
  //       title: "Booking Failed",
  //       message: error?.response?.data?.message || "Something went wrong.",
  //     });
  //   }
  // };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!doctor)
    return <p className="text-center text-red-600 text-2xl mt-10">Doctor not found.</p>;

  return (
    <div className="max-w-5xl mt-[90px] mx-auto bg-neutral-50 p-6
     dark:bg-neutral-950 dark:text-white   dark:shadow-gray-700
      rounded-2xl space-y-10">
      {/* Doctor Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src={doctor.profilePic?.url || "https://via.placeholder.com/150"}
          alt="Doctor"
          className="w-40 h-40 rounded-full object-cover border-4 border-[#00B5C9]"
        />
        <div className="space-y-1">
          <h1 className="text-3xl text-[#00B5C9] font-bold">{doctor.name}</h1>
          <p className="text-lg font-semibold">{doctor.specialization}</p>
          <p className="text-sm text-gray-300">Experience: {doctor.experience} years</p>
        </div>
      </div>

      {/* Bio and Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">Bio:</h2>
          <p className="p-2 rounded-md shadow-sm whitespace-pre-wrap">
            {doctor.bio || "No bio available."}
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
          {doctor.availableDays && doctor.availableDays.length > 0 && (
            <p><strong>Available Days:</strong> {doctor.availableDays.join(", ")}</p>
          )}
          {doctor.availableTime && (
            <p><strong>Available Time:</strong> {doctor.availableTime}</p>
          )}
          <p><strong>Appointment Fee:</strong> ₹{doctor.fee || 500}</p>
        </div>
      </div>

      {/* Appointment Booking Form */}
      <AppointmentForm
  doctorId={doctor._id}
  doctorName={doctor.name}
  doctorFee={doctor.fee}
  availableSlots={doctor.availableSlots}
/>

      {/* Alert Component */}
      {alert && (
        <AppAlert
          title={alert.title}
          message={alert.message}
          type={alert.type}
        />
      )}

      {/* Review Form */}
      <div className="bg-gray-50 border dark:bg-neutral-950 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        <RatingForm doctorId={doctor._id} />
      </div>

      {/* Review List */}
      <div className="bg-gray-50 dark:bg-neutral-950 border p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">What Patients Say</h2>
        <RatingList doctorId={doctor._id} />
      </div>
    </div>
  );
};

export default DoctorDetailPage;
