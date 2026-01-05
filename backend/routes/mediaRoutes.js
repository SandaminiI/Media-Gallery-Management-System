import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import { upload } from "../utils/upload.js";
import { uploadMedia, listMyMedia, deleteMedia, updateMedia, downloadZip, toggleShare, listSharedMedia, getMyStats } from "../controllers/mediaController.js";

const router = express.Router();

// list user media
router.get("/", requireAuth, listMyMedia);

// upload
router.post("/upload", requireAuth, upload.single("file"), uploadMedia);

// delete
router.delete("/:id", requireAuth, deleteMedia);

//update
router.put("/:id", requireAuth, updateMedia);

//zip download
router.post("/zip", requireAuth, downloadZip);

// shared gallery (any logged in user can view)
router.get("/shared",  listSharedMedia);

// toggle share
router.patch("/:id/share", requireAuth, toggleShare );

// get my status
router.get("/my/stats", requireAuth, getMyStats);

export default router;
