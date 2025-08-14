import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react"; // Optional: if you're using Lucide icons

const RatingList = ({ doctorId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${doctorId}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [doctorId]);

  if (!reviews.length)
    return <p className="text-center text-gray-500 italic mt-4">No reviews yet. Be the first to leave one!</p>;

  return (
    <div className="space-y-6 mt-6 grid grid-cols-2">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="p-6 bg-white  dark:bg-black dark:text-white rounded-xl shadow-md border  transition hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold dark:text-[#00B5C9] text-gray-800">@{review.user.name}</h3>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < review.rating ? "text-yellow-500 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-200">{review.comment}</p>
          <p className="text-sm text-gray-400 mt-2">Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingList;
