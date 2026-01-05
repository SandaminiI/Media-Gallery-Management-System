import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import { optionalAuth } from "../middlewares/optionalAuth.js";
import {
  createContact,
  getMyMessages,
  updateMyMessage,
  deleteMyMessage,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", optionalAuth, createContact);
router.get("/my-messages", requireAuth, getMyMessages);
router.put("/:id", requireAuth, updateMyMessage);
router.delete("/:id", requireAuth, deleteMyMessage);

export default router;
