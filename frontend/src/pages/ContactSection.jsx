import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success or error message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);
      
      // POST to your backend 
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, formData);

      if (res.data.success) {
        setStatus({ type: "success", text: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" }); // reset form
      } else {
        setStatus({ type: "error", text: res.data.message || "Something went wrong." });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Failed to send message. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="body-font mt-20 relative  text-gray-400">
      <div className="container mx-auto px-5 py-24">
        {/* Heading */}
        <div className="mb-12 flex w-full flex-col text-center">
          <h1 className="title-font mb-4 text-2xl font-medium text-[#00B5C9] sm:text-3xl">
            Contact Us
          </h1>
          <p className="mx-auto text-base leading-relaxed lg:w-2/3">
            Feel free to reach out to us! Whether you have a question, feedback, 
            or a collaboration proposal, we'd love to hear from you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mx-auto md:w-2/3 lg:w-1/2">
          <div className="-m-2 flex flex-wrap">
            {/* Name */}
            <div className="w-1/2 p-2">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full rounded border border-gray-700 bg-gray-800 py-1 px-3 text-base text-gray-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
                  placeholder="Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 -top-6 text-sm text-[#00B5C9]"
                >
                  Name
                </label>
              </div>
            </div>

            {/* Email */}
            <div className="w-1/2 p-2">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full rounded border border-gray-700 bg-gray-800 py-1 px-3 text-base text-gray-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-6 text-sm text-[#00B5C9]"
                >
                  Email
                </label>
              </div>
            </div>

            {/* Message */}
            <div className="mt-4 w-full p-2">
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="peer h-32 w-full resize-none rounded border border-gray-700 bg-gray-800 py-1 px-3 text-base text-gray-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
                  placeholder="Message"
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-3 -top-6 text-sm text-[#00B5C9] text-pretty"
                >
                  Message
                </label>
              </div>
            </div>

            {/* Button */}
            <div className="w-full p-2">
              <Button
                type="submit"
                disabled={loading}
                className="mx-auto flex rounded bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </div>

            {/* Status Message */}
            {status && (
              <div className="w-full p-2 text-center">
                <p
                  className={`${
                    status.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {status.text}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
