import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="relative">
      {/* Background image with curve */}
      <div className="relative bg-[url('../img/d.png')] w-full bg-cover bg-center min-h-screen">
        
        {/* Curve shape at bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            className="fill-white dark:fill-neutral-950"
            d="M0,224 C480,450 960,100 1440,240 L1440,320 L0,320 Z"
          ></path>
        </svg>

        <section
          ref={ref}
          className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 pt-32"
        >
          <motion.div
            className="text-left max-w-xl"
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold mb-6 text-white dark:text-gray-900 leading-tight drop-shadow-lg">
              Empowering Better{" "}
              <span className="dark:text-white text-black">Healthcare</span>
            </h1>
            <h3 className="text-xl font-medium text-gray-200 dark:text-gray-700 drop-shadow">
              Connecting patients with trusted medical professionals, anytime, anywhere.
            </h3>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
