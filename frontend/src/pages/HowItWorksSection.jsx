import React from "react";
import {
  FaUserPlus,
  FaUserMd,
  FaCalendarAlt,
  FaStethoscope,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Unlock a seamless healthcare experience by creating an account.",
    icon: <FaUserPlus className="text-[#00B5C9] text-3xl mb-3" />,
    borderColor: "border-[#00B5C9]",
  },
  {
    number: "02",
    title: "Search Doctor",
    description: "Browse and find the right doctor based on your needs.",
    icon: <FaUserMd className="text-[#00B5C9] text-3xl mb-3" />,
    borderColor: "border-[#00B5C9]",
  },
  {
    number: "03",
    title: "Schedule Appointment",
    description: "Pick a convenient time to meet with your preferred doctor.",
    icon: <FaCalendarAlt className="text-[#00B5C9] text-3xl mb-3" />,
    borderColor: "border-[#00B5C9]",
  },
  {
    number: "04",
    title: "Start Consultation",
    description: "Begin your consultation with the healthcare professional.",
    icon: <FaStethoscope className="text-[#00B5C9] text-3xl mb-3" />,
    borderColor: "border-[#00B5C9]",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 mt-12 mb-12  text-center  ">
      <h2 className="text-3xl md:text-4xl font-bold">
        How It <span className="text-[#00B5C9]">Work</span>
      </h2>
      <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
        We've streamlined the process to ensure a hassle-free experience from start to finish.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`border-b-4 ${step.borderColor} p-6 shadow-sm rounded-lg transition-transform hover:-translate-y-1 hover:shadow-md duration-300`}
          >
            <div className="text-4xl font-bold text-gray-300 mb-1">
              {step.number}
            </div>
            <div className="flex justify-center">{step.icon}</div>
            <h3 className="text-lg font-semibold dark:text-white text-gray-800">{step.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
