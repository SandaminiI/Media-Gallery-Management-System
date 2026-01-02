import express from "express";
import { body } from "express-validator";
import { requireAuth } from "../middlewares/auth.js";
import { register, verifyOtp, login, me, forgotPassword, resetPassword, getMe, updateMe } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", body("email").isEmail(), body("password").isLength({ min: 6 }), register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", body("newPassword").isLength({ min: 6 }), resetPassword);
router.get("/me", requireAuth, getMe);
router.put("/me", requireAuth, updateMe);

export default router;
