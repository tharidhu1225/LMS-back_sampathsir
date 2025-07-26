// controllers/adminController.js
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Book from "../models/Book.js";
import Paper from "../models/Paper.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const tokenBlacklist = []; // 🧠 In-memory blacklist (temporary solution)

// ✅ Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 🛡️ Sign token with admin ID
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ✅ Logout Admin (Blacklist token)
export const logoutAdmin = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "Token required" });

    tokenBlacklist.push(token);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Logout error" });
  }
};

// ✅ Get All Admins (optional)
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    console.error("Fetch admins error:", err);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};

// ✅ Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin?.id; // 🔒 comes from verifyToken middleware

    if (!adminId) return res.status(401).json({ message: "Unauthorized" });

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ name: admin.username });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};


export const getAdminStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalPapers = await Paper.countDocuments();

    res.status(200).json({
      username: "Admin", // you can replace with dynamic user if needed
      stats: {
        totalBooks,
        totalPapers,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching admin stats",
      error: error.message,
    });
  }
};
