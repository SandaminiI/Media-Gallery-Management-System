import { useState } from "react";
import http from "../api/http";

export default function EditMediaModal({ item, onClose, onSaved }) {
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [tags, setTags] = useState((item?.tags || []).join(","));
  const [err, setErr] = useState("");

  async function save() {
    try {
      setErr("");
      await http.put(`/api/media/${item._id}`, { title, description, tags });
      onSaved?.();
      onClose?.();
    } catch (e) {
      setErr(e.response?.data?.message || "Update failed");
    }
  }

  if (!item) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <h5 className="modal-title mb-2">Edit Media</h5>

          {err && <div className="alert alert-danger">{err}</div>}

          <input
            className="form-control mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            className="form-control mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
          />

          <input
            className="form-control mb-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
          />

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-outline-secondary" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="btn btn-dark" onClick={save} type="button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
