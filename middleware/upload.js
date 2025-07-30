// Config/uploadMiddleware.js

import multer from "multer";

// Store file in memory (not in uploads/ folder)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max size
  },
});

export default upload;
