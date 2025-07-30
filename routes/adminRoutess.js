// routes/adminRoutes.js
import express from "express";
import {
  AllAdmins,
  DeleteAdmin,
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
Adminrouter.get("/profile", verifyToken, getAdminProfile);
Adminrouter.post("/logout", verifyToken, logoutAdmin);
Adminrouter.get("/list", verifyToken, getAllAdmins);
Adminrouter.get("/stack", getAdminStats);
Adminrouter.get("/all", AllAdmins);
Adminrouter.delete("/:id", DeleteAdmin); 

export default Adminrouter;
