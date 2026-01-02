import { useState } from "react";

export default function MessageList({
  items = [],
  mode = "user",            
  onEdit,                 
  onDelete,                   
}) {
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState("");

  function openEdit(m) {
    setEditItem(m);
    setEditText(m.message || "");
  }

  function closeEdit() {
    setEditItem(null);
    setEditText("");
  }

  function saveEdit() {
    if (!editItem) return;
    onEdit?.(editItem, editText);
    closeEdit();
  }

  return (
    <>
      <div className="list-group">
        {items.map((m) => (
          <div key={m._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div className="w-100">
                <div className="small text-muted">
                  {new Date(m.createdAt).toLocaleString()}
                </div>

                {/* Admin view shows user info */}
                {mode === "admin" && (
                  <div className="small mt-1">
                    <b>{m.name}</b> ({m.email}){" "}
                    {m.userId ? <span className="text-success">(logged)</span> : <span className="text-secondary">(guest)</span>}
                  </div>
                )}

                <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
                  {m.message}
                </div>
              </div>

              <div className="d-flex gap-2">
                {/* User view: Edit + Delete */}
                {mode === "user" && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    type="button"
                    onClick={() => openEdit(m)}
                  >
                    Edit
                  </button>
                )}

                {/* Both user/admin can delete (admin deletes any) */}
                <button
                  className="btn btn-outline-danger btn-sm"
                  type="button"
                  onClick={() => onDelete?.(m._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="list-group-item text-muted text-center">
            No messages yet
          </div>
        )}
      </div>

      {/* Edit Modal only for user mode */}
      {mode === "user" && editItem && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Message</h5>
                <button type="button" className="btn-close" onClick={closeEdit} />
              </div>

              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="5"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" onClick={closeEdit}>
                  Cancel
                </button>
                <button className="btn btn-primary" type="button" onClick={saveEdit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
