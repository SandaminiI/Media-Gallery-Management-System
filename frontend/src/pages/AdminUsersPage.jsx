import { useEffect, useState } from "react";
import http from "../api/http";

export default function AdminUsersPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const [editUser, setEditUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [isActive, setIsActive] = useState(true);

  async function load() {
    setErr("");
    const { data } = await http.get("/api/admin/users");
    setItems(data);
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await http.get("/api/admin/users");
        if (alive) setItems(data);
      } catch (e) {
        if (alive) setErr(e.response?.data?.message || "Failed to load users");
      }
    })();
    return () => (alive = false);
  }, []);

  function openEdit(u) {
    setMsg("");
    setErr("");
    setEditUser(u);
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setIsActive(u.isActive);
  }

  function closeEdit() {
    setEditUser(null);
  }

  async function save() {
    try {
      await http.put(`/api/admin/users/${editUser._id}`, { name, email, role, isActive });
      setMsg("User updated");
      closeEdit();
      await load();
    } catch (e) {
      setErr(e.response?.data?.message || "Update failed");
    }
  }

  async function deactivate(id) {
    if (!confirm("Deactivate this user?")) return;
    try {
      await http.patch(`/api/admin/users/${id}/deactivate`);
      setMsg("User deactivated");
      await load();
    } catch (e) {
      setErr(e.response?.data?.message || "Deactivate failed");
    }
  }

  return (
    <div className="container py-4">
      <h3>User Management</h3>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ width: 220 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>
                  {u.isActive ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Inactive</span>
                  )}
                </td>
                <td className="d-flex gap-2">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => openEdit(u)} type="button">
                    Edit
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => deactivate(u._id)} type="button">
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="text-muted text-center">No users</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button className="btn-close" onClick={closeEdit} />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    id="active"
                  />
                  <label className="form-check-label" htmlFor="active">
                    Active
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeEdit} type="button">Cancel</button>
                <button className="btn btn-primary" onClick={save} type="button">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
