// controllers/uploadController.js
import cloudinary from "../Config/cloudinary.js";
import Upload from "../models/Upload.js";

// POST upload file
export const createUpload = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;

    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      async (error, result) => {
        if (error) return res.status(500).json({ error });

        const newUpload = new Upload({
          title,
          description,
          fileUrl,
          thumbnailUrl: result.secure_url,
        });

        await newUpload.save();
        res.status(201).json(newUpload);
      }
    );

    req.pipe(cloudinaryResult);
  } catch (err) {
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
