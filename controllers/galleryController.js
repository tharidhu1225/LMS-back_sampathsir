import Gallery from "../models/Gallery.js";
import cloudinary from "../Config/cloudinary.js";
import fs from "fs";

// POST /api/gallery - Create gallery item with images
export const createImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No image files provided." });
    }

    const uploadedUrls = [];

    for (let file of files) {
      // Convert buffer to base64 string
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "gallery",
      });

      uploadedUrls.push(result.secure_url);
    }

    const newImage = new Gallery({
      title,
      description,
      imageUrl: uploadedUrls,
    });

    await newImage.save();

    res.status(201).json({
      message: "Gallery item created successfully",
      data: newImage,
    });

  } catch (err) {
    console.error("Create Image Error:", err);
    res.status(500).json({ error: "Server error while uploading images." });
  }
};

// GET /api/gallery/:id - Get single gallery item by ID
export const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({ error: "Gallery item not found." });
    }

    res.status(200).json(image);

  } catch (err) {
    console.error("Get Image By ID Error:", err);
    res.status(500).json({ error: "Server error while retrieving gallery item." });
  }
};


export const getAllImages = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(galleries);
  } catch (err) {
    console.error("Get All Images Error:", err);
    res.status(500).json({ error: "Server error while retrieving gallery items." });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const imageItem = await Gallery.findById(req.params.id);

    if (!imageItem) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Function to extract public ID from Cloudinary URL
    const extractPublicId = (url) => {
      const regex = /upload\/(?:v\d+\/)?(.+)\.\w+$/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    // Delete each image from Cloudinary
    await Promise.all(
      imageItem.imageUrl.map(async (url) => {
        const publicId = extractPublicId(url);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.warn("⚠️ Failed to delete Cloudinary image:", publicId);
          }
        }
      })
    );

    // Delete from MongoDB
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Gallery item and images deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete gallery item." });
  }
};