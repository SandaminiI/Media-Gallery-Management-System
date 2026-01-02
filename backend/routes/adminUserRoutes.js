import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/admin.js";
import {
  adminListUsers,
  adminUpdateUser,
  adminDeactivateUser,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.get("/", requireAuth, requireAdmin, adminListUsers);
router.put("/:id", requireAuth, requireAdmin, adminUpdateUser);
router.patch("/:id/deactivate", requireAuth, requireAdmin, adminDeactivateUser);

export default router;
