import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeaturesGrid from "../components/FeaturesGrid";




export default function AboutUs() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/doctors")
  };
  return (
    <div className="">
      {/* Hero Section */}
      <section
  className="relative flex  md:flex-row items-center max-w-8xl mx-auto lg:pr-20  py-20 gap-8
             bg-[url('../img/s.jpg')] justify-end bg-cover bg-center rounded-lg overflow-hidden"
  style={{ minHeight: "600px" }}
>
  {/* Overlay for better text contrast */}
  <div className="absolute inset-0 bg-black/5 dark:bg-black/10"></div>

  {/* Text */}
  <motion.div
    className="relative z-10 md:w-1/2 px-6  text-white md:pl-12 mt-8 md:mt-0"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-4xl font-bold mb-4">
      About <span className="text-[#00B5C9]">MediConnect</span>
    </h2>
    <p className="mb-4 leading-relaxed text-black">
      MediConnect is your trusted healthcare partner, connecting patients with highly qualified and specialized doctors across multiple fields. Whether you need a cardiologist, dermatologist, pediatrician, or general physician — we’ve got you covered.
    </p>
    <p className="mb-6 leading-relaxed text-neutral-800">
      Our platform makes it easy to search, compare, and book appointments with the best doctors according to your health needs. From online consultations to in-clinic visits, MediConnect ensures quality care at your convenience.
    </p>
    <Button variant="outline" className="bg-[#00B5C9] border-black hover:bg-[#0099ac] text-white">
      Book an Appointment
    </Button>
  </motion.div>
</section>


      <section className="w-full  px-6 py-16 dark:custom rounded-lg shadow-md dark:shadow-none mt-12">
  <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
    Our Mission
  </h3>
  <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
    At MediConnect, our mission is to make healthcare accessible, affordable, and reliable for everyone. We strive to empower patients by connecting them with specialized doctors and providing seamless appointment booking — ensuring the right care at the right time.
  </p>
</section>
<div className="flex my-10">
<FeaturesGrid title={"Why Choose"} subtitle={"Us"}/>
</div>

<motion.section
        className="bg-[#00B5C9] text-white py-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Find the Right Doctor for Your Needs Today
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-100">
          Quick, simple, and reliable doctor booking at your fingertips.
        </p>
        <Button onClick={handleGetStarted}
          variant="secondary"
          className="bg-white text-[#00B5C9] hover:bg-gray-100 px-8 py-3 text-lg"
        >
          Get Started
        </Button>
      </motion.section>
          </div>

        
  );
}
