import Contact from "../models/Contact.js";

// GET /api/admin/contact (admin)
export async function getAllMessages(req, res) {
  try {
    const rows = await Contact.find()
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });
    res.json(rows);
  } catch {
    res.status(500).json({ message: "Failed to load all messages" });
  }
}

// DELETE /api/admin/contact/:id (admin)
export async function adminDeleteMessage(req, res) {
  try {
    const { id } = req.params;
    const doc = await Contact.findById(id);
    if (!doc) return res.status(404).json({ message: "Message not found" });

    await Contact.deleteOne({ _id: id });
    res.json({ message: "Deleted by admin" });
  } catch {
    res.status(500).json({ message: "Failed to delete message" });
  }
}
