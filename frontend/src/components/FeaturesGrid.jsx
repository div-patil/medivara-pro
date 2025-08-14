import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope,
  HeartPulse,
  CalendarClock,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Find Doctors",
    desc: "Locate Your Nearest Doctor and Book Instantly",
    icon: Stethoscope,
  },
  {
    title: "Book Appointment",
    desc: "Easily Schedule Appointments with Just a Few Clicks",
    icon: CalendarClock,
  },
  {
    title: "Quality Care",
    desc: "Receive World-Class Healthcare Services Tailored to You",
    icon: HeartPulse,
  },
  {
    title: "Emergency Support",
    desc: "Get Immediate Help in Case of Medical Emergencies",
    icon: AlertTriangle,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const FeaturesGrid = ({title,subtitle}) => {
  return (
    <section className=" py-16 px-20  md:px-15">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold dark:text-gray-100 ">
          {title} <span className="text-[#00B5C9]">{subtitle}</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Explore healthcare features crafted to serve you better
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {services.map((service, index) => {
    const Icon = service.icon;
    return (
      <motion.div
        key={index}
        className="w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={index}
        variants={cardVariants}
      >
        <Card className="hover:scale-[1.03] dark:hover:bg-[#00B5C9] hover:bg-[#00B5C9] h-full text-center transition-all duration-300 shadow-md border border-gray-200 text-white dark:bg-neutral-950 rounded-tl-[80px] rounded-br-[80px]">
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
            <div className="bg-[#E6FAFD] dark:bg-neutral-900 p-4 rounded-full">
              <Icon className="h-10 w-10 text-[#00B5C9]" />
            </div>
            <h3 className="text-lg font-semibold dark:text-gray-100 text-gray-900 ">
              {service.title}
            </h3>
            <p className="text-sm  dark:text-gray-400">{service.desc}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  })}
</div>

    </section>
  );
};

export default FeaturesGrid;
