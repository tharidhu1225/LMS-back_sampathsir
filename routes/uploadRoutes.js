// routes/uploadRoutes.js
import express from "express";
import upload from "../Config/uploadMiddleware.js";
import { createUpload, deleteUpload, getUploads } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("thumbnail"), createUpload);
uploadRouter.get("/uploads", getUploads);
uploadRouter.delete("/:id", deleteUpload);

export default uploadRouter;
