import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

function fileFilter(req, file, cb) {
  const allowed = [
    "image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif",
    "video/mp4", "video/webm", "video/quicktime"
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image/video files are allowed"), false);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
