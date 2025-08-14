import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to protect routes
 * Verifies JWT token and attaches user to req.user
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user without password
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    // Handle token expiration and invalid token separately
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
    console.error("Auth middleware error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export default protect;
