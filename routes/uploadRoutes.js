// routes/uploadRoutes.js
import express from "express";
import upload from "../Config/uploadMiddleware.js";
import { createUpload, getUploads } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("thumbnail"), createUpload);
uploadRouter.get("/uploads", getUploads);

export default uploadRouter;
