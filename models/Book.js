import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  medium: { type: String, required: true }, // Sinhala / English / Tamil
  grade: { type: String, required: true },
  downloadLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Book", bookSchema);
