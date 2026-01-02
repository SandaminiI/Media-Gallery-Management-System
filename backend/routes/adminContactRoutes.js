import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/admin.js";
import { getAllMessages, adminDeleteMessage } from "../controllers/adminContactController.js";

const router = express.Router();

router.get("/", requireAuth, requireAdmin, getAllMessages);
router.delete("/:id", requireAuth, requireAdmin, adminDeleteMessage);

export default router;
