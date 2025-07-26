// routes/adminRoutes.js
import express from "express";
import {
  getAdminProfile,
  getAdminStats,
  getAllAdmins,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const Adminrouter = express.Router();

// ✅ Public routes
Adminrouter.post("/register", registerAdmin);
Adminrouter.post("/login", loginAdmin);

// ✅ Protected routes
Adminrouter.get("/profile", verifyToken, getAdminProfile);
Adminrouter.post("/logout", verifyToken, logoutAdmin);

// 🧪 Optional
Adminrouter.get("/list", verifyToken, getAllAdmins);
Adminrouter.get("/stack", getAdminStats);

export default Adminrouter;
