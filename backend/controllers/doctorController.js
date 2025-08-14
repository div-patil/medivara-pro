import Doctor from "../models/Doctor.js";

export const createDoctor = async (req, res) => {
  const doct = Doctor.deleteMany({});
  console.log("doct =", doct);
  try {
    const {
      name,
      specialization,
      email,
      phone,
      fee,
      location,
      experience,
      availableDays,
      availableTime,
      bio,
    } = req.body;
console.log(req.body)
    let profilePic = {};

    // Cloudinary multer sets req.file.path to uploaded image URL
    if (req.file) {
      console.log("File uploaded:", req.file);
      profilePic = {
        url: req.file.path,                 // <-- Cloudinary URL here
        filename: req.file.filename || req.file.originalname,
      };
    }
console.log("hello")
    const doctor = new Doctor({
      name,
      specialization,
      email,
      phone,
      location,
      fee,
      experience,
      availableDays: Array.isArray(availableDays) ? availableDays : JSON.parse(availableDays || "[]"),
      availableTime,
      bio,
      profilePic,
    });
console.log("doctor =",doctor)
    if (!doctor.name || !doctor.specialization || !doctor.email) {
      return res.status(400).json({
        success: false,
        message: "Name, specialization, and email are required",
      });
    }

    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

     await doctor.save();
    
    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor,
    });
  } catch (err) {
    console.error("Error creating doctor:", err);
    res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// GET all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const { search, location } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } }
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (filter.$or && filter.$or.length === 0) {
      const doctors = await Doctor.find({});
      return res.status(200).json({ success: true, doctors });
    }

    const doctors = await Doctor.find(filter);
    res.status(200).json({ success: true, doctors });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const id = req.params.id;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// export const createDoctor = async (req, res) => {
//   try {
//     const {
//       name,
//       specialization,
//       email,
//       phone,
//       fee,
//       location,
//       experience,
//       availableDays,
//       availableTime,
//       bio,
//     } = req.body;

//     let profilePic = {};

//     if (req.file) {
//       profilePic = {
//         url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
//         filename: req.file.filename,
//       };
//     }

//     const doctor = new Doctor({
//       name,
//       specialization,
//       email,
//       phone,
//       location,
//       fee,
//       experience,
//       availableDays: availableDays ? JSON.parse(availableDays) : [],
//       availableTime,
//       bio,
//       profilePic,
//     });

//     if (!doctor.name || !doctor.specialization || !doctor.email) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, specialization, and email are required",
//       });
//     }

//     const existing = await Doctor.findOne({ email });
//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already registered",
//       });
//     }

//     await doctor.save();
//     res.status(201).json({
//       success: true,
//       message: "Doctor created successfully",
//       doctor,
//     });
//   } catch (err) {
//     console.error("Error creating doctor:", err);
//     res.status(400).json({
//       success: false,
//       message: err.message || "Something went wrong",
//     });
//   }
// };

export const searchBySpecialize = async (req, res) => {
  try {
    // Example: Searching for Dermatologist - you may want to get specialization from query
    const specialize = await Doctor.find({ specialization: "Dermatologist" });

    if (!specialize || specialize.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Not Found"
      });
    }

    res.status(200).json({
      success: true,
      data: specialize
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};
