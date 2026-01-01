import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import User from "../models/User.js";
import { generateOtp6, otpExpiryMinutes } from "../utils/otp.js";
import { sendOtpEmail } from "../utils/mailer.js";

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, 12);

  const otp = generateOtp6();
  const otpHash = await bcrypt.hash(otp, 12);

  await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    isVerified: false,
    otpHash,
    otpExpiresAt: otpExpiryMinutes(10)
  });

  await sendOtpEmail({ to: email.toLowerCase(), otp, subject: "Verify account OTP" });

  res.status(201).json({ message: "Registered. OTP sent to email.", email: email.toLowerCase() });
}

export async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.otpHash || !user.otpExpiresAt) return res.status(400).json({ message: "No OTP requested" });
  if (user.otpExpiresAt.getTime() < Date.now()) return res.status(400).json({ message: "OTP expired" });

  const ok = await bcrypt.compare(String(otp), user.otpHash);
  if (!ok) return res.status(400).json({ message: "Invalid OTP" });

  user.isVerified = true;
  user.otpHash = null;
  user.otpExpiresAt = null;
  await user.save();

  res.json({ message: "Verified successfully. You can login now." });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  if (!user.isActive) return res.status(403).json({ message: "Account deactivated" });
  if (!user.isVerified) return res.status(403).json({ message: "Please verify OTP first" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

export async function me(req, res) {
  const u = req.user;
  res.json({ id: u._id, name: u.name, email: u.email, role: u.role, isVerified: u.isVerified, isActive: u.isActive });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  // Safe response (don’t reveal if user exists)
  if (!user) return res.json({ message: "If account exists, OTP sent." });
  if (!user.isActive) return res.status(403).json({ message: "Account deactivated" });

  const otp = generateOtp6();
  user.otpHash = await bcrypt.hash(otp, 12);
  user.otpExpiresAt = otpExpiryMinutes(10);
  await user.save();

  await sendOtpEmail({ to: user.email, otp, subject: "Reset password OTP" });

  return res.json({ message: "If account exists, OTP sent." });
}

export async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.otpHash || !user.otpExpiresAt) {
    return res.status(400).json({ message: "No OTP requested" });
  }

  if (user.otpExpiresAt.getTime() < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  const ok = await bcrypt.compare(String(otp), user.otpHash);
  if (!ok) return res.status(400).json({ message: "Invalid OTP" });

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.otpHash = null;
  user.otpExpiresAt = null;
  user.isVerified = true; // ensure verified
  await user.save();

  return res.json({ message: "Password updated. Please login." });
}
