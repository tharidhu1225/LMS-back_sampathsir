// middleware/uploadMiddleware.js
import multer from "multer";
const storage = multer.memoryStorage(); // To buffer uploads for Cloudinary
const upload = multer({ storage });

export default upload;
