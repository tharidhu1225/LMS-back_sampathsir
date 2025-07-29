// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Adminrouter from "./routes/adminRoutess.js";
import bookRouter from "./routes/bookRouter.js";
import paperRouter from "./routes/paperRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", Adminrouter);
app.use("/api/books", bookRouter);
app.use("/api/paper", paperRouter);
app.use("/api/upload", uploadRouter);

// MongoDB Connect and Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
