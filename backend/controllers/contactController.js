import Contact from "../models/Contact.js";

// POST /api/contact (all users)
export async function createContact(req, res) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "name, email, message are required" });
    }

    const doc = await Contact.create({
      name,
      email,
      message,
      userId: req.user?._id || null,
    });

    res.status(201).json(doc);
  } catch (e) {
     console.log("createContact error:", e); 
    res.status(500).json({ message: "Failed to submit message" });
  }
}

// GET /api/contact/my-messages (auth)
export async function getMyMessages(req, res) {
  try {
    const rows = await Contact.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(rows);
  } catch {
    res.status(500).json({ message: "Failed to load messages" });
  }
}

// PUT /api/contact/:id (owner only)
export async function updateMyMessage(req, res) {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) return res.status(400).json({ message: "message is required" });

    const doc = await Contact.findById(id);
    if (!doc) return res.status(404).json({ message: "Message not found" });

    if (!doc.userId || doc.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    doc.message = message;
    await doc.save();

    res.json(doc);
  } catch {
    res.status(500).json({ message: "Failed to update message" });
  }
}

// DELETE /api/contact/:id (owner only)
export async function deleteMyMessage(req, res) {
  try {
    const { id } = req.params;

    const doc = await Contact.findById(id);
    if (!doc) return res.status(404).json({ message: "Message not found" });

    if (!doc.userId || doc.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Contact.deleteOne({ _id: id });
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete message" });
  }
}
