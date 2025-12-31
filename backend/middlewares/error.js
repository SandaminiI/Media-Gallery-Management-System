export function notFound(req, res) {
  res.status(404).json({ message: `Not Found: ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error("Error:", err);
  res.status(500).json({ message: err.message || "Server error" });
}
