import multer from "multer";

const storage = multer.memoryStorage();

const singleUpload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB in bytes
  },
  storage,
}).single("file");

export default singleUpload;
