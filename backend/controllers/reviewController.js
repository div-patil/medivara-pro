import Review from "../models/Review.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

export const createReview = async (req, res) => {
  const { doctorId } = req.params;
  const { rating, comment } = req.body;

  try {
    const user = req.user; // set by auth middleware

    const alreadyReviewed = await Review.findOne({
      doctor: doctorId,
      user: user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this doctor." });
    }

    const review = new Review({
      doctor: doctorId,
      user: user._id,
      rating,
      comment,
    });

    await review.save();

    // Recalculate average rating
    const reviews = await Review.find({ doctor: doctorId });
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Doctor.findByIdAndUpdate(doctorId, {
      averageRating: avg.toFixed(1),
      numReviews: reviews.length,
    });

    res.status(201).json({ message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ message: "Error submitting review", error });
  }
};

export const getReviewsByDoctorId = async (req, res) => {
  try {
    const reviews = await Review.find({ doctor: req.params.doctorId })
      .populate("user", "name") // Or "username" if you use that
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};
