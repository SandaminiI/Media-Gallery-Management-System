import { useMemo, useState, useEffect } from "react";
import http from "../api/http";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function setFileWithValidation(f) {
    setMsg("");
    setErr("");

    if (!f) {
      setFile(null);
      return;
    }

    const okType = ["image/jpeg", "image/jpg", "image/png"].includes(f.type);
    if (!okType) {
      setErr("Only JPG/PNG images are allowed");
      setFile(null);
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      setErr("Max file size is 5MB");
      setFile(null);
      return;
    }

    setFile(f);
  }

  async function upload(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!file) return setErr("Please choose a JPG/PNG image");

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("title", title);
      form.append("description", description);
      form.append("tags", tags);

      await http.post("/api/media/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("Uploaded successfully");
      setFile(null);
      setTitle("");
      setDescription("");
      setTags("");
    } catch (e2) {
      setErr(e2.response?.data?.message || "Upload failed");
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 800 }}>
      <h2 className="mb-3">Upload Image</h2>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <form onSubmit={upload} className="card p-3">
        <div
          className="border rounded p-3 text-center mb-3"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setFileWithValidation(e.dataTransfer.files?.[0]);
          }}
        >
          {file ? (
            <img
              src={previewUrl}
              alt="preview"
              className="img-fluid mb-2"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
          ) : (
            <div className="text-muted">Drag & drop JPG/PNG here (Max 5MB)</div>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg"
            className="form-control mt-2"
            onChange={(e) => setFileWithValidation(e.target.files?.[0])}
          />
        </div>

        <input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-2"
        />

        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          className="form-control mb-2"
          rows={3}
        />

        <input
          value={tags}
          placeholder="Tags (comma separated)"
          onChange={(e) => setTags(e.target.value)}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-dark w-100">
          Upload
        </button>
      </form>
    </div>
  );
}
