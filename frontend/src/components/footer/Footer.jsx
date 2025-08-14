import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="dark:bg-neutral-900  dark:text-gray-200   px-6 py-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-sky-700 opacity-10 animate-blob3" />
        <div className="w-60 h-60 rounded-full bg-pink-700 opacity-10 animate-blob4" />
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#00B5C9]">LocDoctor</h2>
          <p className="mb-4">
            Creating innovative solutions for a better future. Stay connected with us!
          </p>
          <div className="flex space-x-4">
            {/* Facebook */}
            <a href="#" className="hover:text-purple-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H12v-2.89h-1.56V9.41c0-1.54.92-2.39 2.34-2.39.68 0 1.39.12 1.39.12v1.53h-.78c-.77 0-1.01.48-1.01 1.02v1.27h2.73l-.44 2.89h-2.29V22C18.34 21.12 22 17 22 12z" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="hover:text-purple-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.56c-.89.39-1.84.66-2.84.78 1.02-.61 1.8-1.58 2.17-2.73-.95.56-2.01.97-3.13 1.19-.9-.96-2.19-1.56-3.61-1.56-2.73 0-4.94 2.21-4.94 4.94 0 .39.04.77.12 1.14-4.1-.21-7.75-2.17-10.19-5.16-.43.74-.68 1.6-.68 2.52 0 1.74.89 3.28 2.24 4.17-.83-.03-1.61-.26-2.29-.63v.06c0 2.43 1.73 4.46 4.03 4.92-.42.11-.86.17-1.31.17-.32 0-.63-.03-.93-.09.63 1.97 2.45 3.41 4.6 3.45-1.68 1.32-3.81 2.11-6.11 2.11-.39 0-.78-.02-1.16-.07 2.19 1.4 4.8 2.22 7.61 2.22 9.13 0 14.13-7.56 14.13-14.13 0-.22-.01-.44-.02-.66.97-.7 1.8-1.58 2.46-2.58z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-purple-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.16c3.18 0 3.58.01 4.85.07 1.17.05 1.98.24 2.43.41.58.22 1 .48 1.44.92.44.44.7.86.92 1.44.17.45.36 1.26.41 2.43.06 1.27.07 1.67.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.98-.41 2.43-.22.58-.48 1-.92 1.44-.44.44-.86.7-1.44.92-.45.17-1.26.36-2.43.41-1.27.06-1.67.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.98-.24-2.43-.41-.58-.22-1-.48-1.44-.92-.44-.44-.7-.86-.92-1.44-.17-.45-.36-1.26-.41-2.43-.06-1.27-.07-1.67-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.98.41-2.43.22-.58.48-1 .92-1.44.44-.44.86-.7 1.44-.92.45-.17 1.26-.36 2.43-.41 1.27-.06 1.67-.07 4.85-.07zm0-2.16C8.75 0 8.33.01 7.06.07 5.79.13 4.78.33 3.98.66 3.24.96 2.61 1.33 2 1.95c-.72.66-1.38 1.38-1.95 2.09-.33.8-.53 1.81-.59 3.08C.01 8.33 0 8.75 0 12s.01 3.67.07 4.94c.06 1.27.26 2.28.59 3.08.57.71 1.23 1.43 1.95 2.09.66.66 1.38 1.38 2.09 1.95.8.33 1.81.53 3.08.59 1.27.06 1.69.07 4.94.07s3.67-.01 4.94-.07c1.27-.06 2.28-.26 3.08-.59.71-.57 1.43-1.23 2.09-1.95.66-.66 1.38-1.38 1.95-2.09.33-.8.53-1.81.59-3.08.06-1.27.07-1.69.07-4.94s-.01-3.67-.07-4.94c-.06-1.27-.26-2.28-.59-3.08-.57-.71-1.23-1.43-1.95-2.09-.66-.66-1.38-1.38-2.09-1.95-.8-.33-1.81-.53-3.08-.59C15.67.01 15.25 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-11.84a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-purple-400 transition">Home</Link></li>
            <li><Link href="/about-us" className="hover:text-purple-400 transition">About</Link></li>
            <li><Link href="/doctors" className="hover:text-purple-400 transition">Doctors</Link></li>
            <li><Link href="/contact-us" className="hover:text-purple-400 transition">Contact</Link></li>
          </ul>
        </div>

       

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">123 Main Street, City, Country</p>
          <p className="mb-2">Email: info@yourbrand.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-gray-400 text-sm relative z-10">
        &copy; 2024 LocDoctor. All rights reserved.
      </div>

      {/* Blob Animations */}
      <style>{`
        @keyframes blob3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes blob4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 25px) scale(0.9); }
        }
        .animate-blob3 {
          animation: blob3 30s infinite ease-in-out;
        }
        .animate-blob4 {
          animation: blob4 35s infinite ease-in-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
