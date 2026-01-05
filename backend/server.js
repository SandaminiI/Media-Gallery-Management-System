import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/error.js";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminContactRoutes from "./routes/adminContactRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
await connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300
  })
);

// serve images
app.use("/uploads", (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  next();
}, express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/contact", adminContactRoutes);
app.use("/api/admin/users", adminUserRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
