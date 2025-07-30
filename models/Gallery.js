import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({ 
    title: { type: String, required: true },
    description: { type: String},
    imageUrl: [],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Gallery", gallerySchema);