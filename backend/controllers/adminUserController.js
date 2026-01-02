import User from "../models/User.js";

export async function adminListUsers(req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
}

export async function adminUpdateUser(req, res) {
  const { id } = req.params;
  const { name, email, role, isActive } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (isActive !== undefined) user.isActive = isActive;

  await user.save();
  res.json(user);
}

// soft delete/deactivate
export async function adminDeactivateUser(req, res) {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isActive = false;
  await user.save();

  res.json({ message: "User deactivated" });
}
