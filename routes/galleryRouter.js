// routes/galleryRouter.js

import express from "express";
import upload from "../middleware/upload.js";
import { createImage, deleteImage, getAllImages, getImageById } from "../controllers/galleryController.js";
import { get } from "mongoose";

const galleryRouter = express.Router();

galleryRouter.post("/", upload.array("images", 5), createImage);
galleryRouter.get("/:id", getImageById);
galleryRouter.get("/", getAllImages);
galleryRouter.delete("/:id", deleteImage);

export default galleryRouter;
