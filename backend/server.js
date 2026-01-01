import express from "express";
//import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/error.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: process.env.FRONTEND_ORIGIN,
//     credentials: true
//   })
// );

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300
  })
);

//routes
app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend running" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
