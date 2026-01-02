import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function optionalAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return next(); 

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);

    if (user && user.isActive) req.user = user;
    return next();
  } catch {
    return next(); 
  }
}
