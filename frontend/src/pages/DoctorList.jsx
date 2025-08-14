import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/24/solid";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select,SelectContent,SelectValue,SelectItem,SelectTrigger } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// Doctor Card Component
// const DoctorCard = ({ doctor }) => {
//   return (
//     <Link to={`/doctors/${doctor._id}`}>
//       {/* <Badge >hello</Badge> */}
//     <div className="max-w-xs p-5 m-5 border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
//   {/* Doctor Image */}
//   <img
//     src={doctor.profilePic?.url || "/default-doctor.jpg"}
//     alt={doctor.name}
//     className="w-full h-56 object-cover rounded-md"
//   />

//   {/* Content */}
//   <div className="p-4">
//     {/* Name & Specialization */}
//     <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
//     <p className="text-sm text-gray-500">{doctor.specialization || "Physician"}</p>

//     {/* Experience & Rating */}
//     <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
//       <div className="flex items-center gap-1">
//         <span className="text-blue-500">👍</span>
//         {doctor.experience || "10"} years
//       </div>
//       <div className="flex items-center gap-1">
//         <span className="text-red-500">❤️</span>
//         {doctor.rating || "4.9"}+
//       </div>
//     </div>
//   </div>
// </div>

//     </Link>
//   );
// };
const DoctorCard = ({ doctor }) => {
  return (
    <Link to={`/doctors/${doctor._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 24px rgba(0, 181, 201, 0.25)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative max-w-xs bg-white dark:bg-neutral-950 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-[#00B5C9] dark:hover:border-[#00B5C9]"
      >
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          <StarIcon className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
          {doctor.rating || "4.5"}
        </div>

        {/* Doctor Image */}
        <div className="flex justify-center mt-6">
          <img
            src={doctor.profilePic?.url || "/default-doctor.jpg"}
            alt={doctor.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
          />
        </div>

        {/* Content */}
        <div className="p-5 text-center">
          {/* Name */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {doctor.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {doctor.location || "1288 Natalie Brook Apt. 966"}
          </p>

          {/* Specialization Badge */}
          <span className="mt-3 inline-block bg-[#E0F7FA] dark:bg-[#003f44] text-[#00B5C9] dark:text-[#4DD0E1] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
            {doctor.specialization || "Physician"}
          </span>

          {/* Divider */}
          <div className="my-4 border-t border-gray-100 dark:border-gray-700"></div>

          {/* Button */}
          <Button
            variant="outline"
            className="w-full rounded-3xl border-[#00B5C9] text-[#00B5C9] hover:bg-[#00B5C9] hover:text-white  transition-colors duration-300 dark:hover:bg-[#00B5C9]"
          >
            Consult Now
          </Button>
        </div>
      </motion.div>
    </Link>
  );
};


// Skeleton Loader
const DoctorSkeleton = () => (
  <Skeleton className="h-80 w-full rounded-xl" />
);

// Main Component


const DoctorList = () => {
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchQuery = params.get("search") || "";

  const fetchDoctors = async (spec = "", loc = "", searchTerm = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/all`, {
        params: {
          ...(spec && { specialization: spec }),
          ...(loc && { location: loc }),
          ...(searchTerm && { search: searchTerm }) // ✅ support search param
        },
      });
      setDoctors(res.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load results based on search query or default all doctors
    fetchDoctors(specialization, location, searchQuery);
  }, [specialization, location, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4 py-10">
       <div className="flex flex-wrap gap-6 mb-8">
        {/* Specialization Select */}
        <Select onValueChange={setSpecialization} className="w-[240px]">
          <SelectTrigger  className="w-[240px]">
            <SelectValue placeholder="Select Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="neurology">Neurology</SelectItem>
            <SelectItem value="orthopedics">Orthopedics</SelectItem>
            <SelectItem value="dentist">Dentist</SelectItem>
            <SelectItem value="dermatology">Dermatology</SelectItem>
            <SelectItem value="ent">ENT</SelectItem>
            <SelectItem value="psychiatry">Psychiatry</SelectItem>
            <SelectItem value="gynaecology">Gynaecology</SelectItem>
            <SelectItem value="oncology">Oncology</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Select */}
        <Select onValueChange={setLocation} className="w-[240px]">
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select Location" className="w-[240px]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="pune">Pune</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="hyderabad">Hyderabad</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
            <SelectItem value="kolkata">Kolkata</SelectItem>
            <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <h2 className="text-4xl font-bold text-center dark:text-white text-black mt-10 mb-20">--- Meet Our <span className="text-[#00B5C9]">Doctors</span> ---</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[...Array(6)].map((_, i) => (
            <DoctorSkeleton key={i} />
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {doctors.map((doc) => (
            <DoctorCard key={doc._id} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
};
export default DoctorList;
