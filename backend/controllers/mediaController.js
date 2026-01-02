import fs from "fs";
import path from "path";
import Media from "../models/Media.js";
import archiver from "archiver";

//upload media
export async function uploadMedia(req, res) {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const { title, description, tags } = req.body;

  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  const media = await Media.create({
    userId: req.user.id,
    originalName: req.file.originalname,
    filename: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url,
    title,
    description,
    tags: tags ? tags.split(",").map(t => t.trim()) : [],
  });

  res.status(201).json(media);
}

//List user media
export async function listMyMedia(req, res) {
  const { q, tag } = req.query;

  let filter = { userId: req.user.id };

  if (q) filter.title = { $regex: q, $options: "i" };
  if (tag) filter.tags = tag;

  const items = await Media.find(filter).sort({ createdAt: -1 });
  res.json(items);
}

//delete media
export async function deleteMedia(req, res) {
  const { id } = req.params;

  const media = await Media.findOne({ _id: id, userId: req.user.id });
  if (!media) return res.status(404).json({ message: "Media not found" });

  // delete file from disk
  const filePath = path.join("uploads", media.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await media.deleteOne();
  res.json({ message: "Deleted" });
}

//download images as zip
export async function downloadZip(req, res) {
  const { ids } = req.body;

  const media = await Media.find({ _id: { $in: ids }, userId: req.user.id });

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=media.zip");

  const archive = archiver("zip");
  archive.pipe(res);

  media.forEach(m => {
    archive.file(`uploads/${m.filename}`, { name: m.originalName });
  });

  archive.finalize();
}

// Update metadata
export async function updateMedia(req, res) {
  const { id } = req.params;
  const { title, description, tags } = req.body;

  const updated = await Media.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    {
      title: title ?? "",
      description: description ?? "",
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Media not found" });
  res.json(updated);
}

// Toggle share
export async function toggleShare(req, res) {
  const { id } = req.params;

  const media = await Media.findOne({ _id: id, userId: req.user.id });
  if (!media) return res.status(404).json({ message: "Media not found" });

  media.isShared = !media.isShared;
  await media.save();

  res.json(media);
}

// List shared (public) media
export async function listSharedMedia(req, res) {
  const items = await Media.find({ isShared: true }).sort({ createdAt: -1 });
  res.json(items);
}

//Get user media status
export async function getMyStats(req, res) {
  try {
    const userId = req.user._id;

    const total = await Media.countDocuments({ userId });
    const shared = await Media.countDocuments({ userId, isShared: true });

    const recent = await Media.find({ userId })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("_id url title originalName createdAt isShared");

    res.json({ total, shared, recent });
  } catch (e) {
    res.status(500).json({ message: "Failed to load stats" });
  }
}
