// models/Upload.js
import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    fileUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true }, // from Cloudinary
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "uploads" }
);

export default mongoose.model("Upload", uploadSchema);
