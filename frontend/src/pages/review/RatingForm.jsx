import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import AppAlert from "../reusable/AppAlert"; // Optional alert component

const RatingForm = ({ doctorId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [alert, setAlert] = useState({ visible: false, type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      return setAlert({ visible: true, type: "error", message: "Please select a rating." });
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:5000/api/reviews/${doctorId}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlert({ visible: true, type: "success", message: "Rating submitted successfully!" });
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setAlert({
        visible: true,
        type: "error",
        message: error.response?.data?.message || "Failed to submit rating.",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 dark:bg-black dark:text-white bg-white shadow-lg rounded-2xl p-8 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-100 text-gray-800">Rate This Doctor</h2>

      <AppAlert
        visible={alert.visible}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, visible: false })}
      />

      <form onSubmit={handleSubmit} className="space-y-6 dark:bg-neutral-950 dark:text-white">
        {/* Star Rating */}
        <div className="flex  items-center space-x-2">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform transform hover:scale-110"
              >
                <FaStar
                  size={32}
                  className={`transition-colors ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Comment Box */}
        <div>
          <textarea
            rows="4"
            className="w-full border dark:bg-black dark:text-white  border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder="Leave a comment (optional)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#00B5C9] hover:bg-[#2acbdd] text-white font-medium py-3 rounded-lg transition-colors"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
