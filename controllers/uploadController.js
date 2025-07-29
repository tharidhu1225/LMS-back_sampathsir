import cloudinary from "../Config/cloudinary.js";
import Upload from "../models/Upload.js";

// POST upload file
export const createUpload = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary using buffer
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(file.buffer); // send the buffer to cloudinary
    });

    // Save to MongoDB
    const newUpload = new Upload({
      title,
      description,
      fileUrl,
      thumbnailUrl: result.secure_url,
    });

    await newUpload.save();
    res.status(201).json(newUpload);
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET all uploads
export const getUploads = async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 });
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
