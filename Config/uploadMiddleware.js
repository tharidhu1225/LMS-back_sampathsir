// middleware/uploadMiddleware.js
import multer from "multer";

// Memory storage to buffer file for Cloudinary stream upload
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
