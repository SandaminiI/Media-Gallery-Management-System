import { useState } from "react";
import http from "../api/http";
import { useAuth } from "../context/useAuth";

export default function ProfilePage() {
  const { user, loadMe } = useAuth();

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  if (!user) {
    return <div className="container py-4">Loading...</div>;
  }

  return <ProfileForm key={user._id} user={user} loadMe={loadMe} setMsg={setMsg} setErr={setErr} msg={msg} err={err} />;
}

function ProfileForm({ user, loadMe, msg, err, setMsg, setErr }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  async function save(e) {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      await http.put("/api/auth/me", { name, email });
      await loadMe(); // refresh auth context
      setMsg("Profile updated");
    } catch (e2) {
      setErr(e2.response?.data?.message || "Update failed");
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 700 }}>
      <h3 className="mb-3">My Profile</h3>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <form className="card p-3" onSubmit={save}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <input
            className="form-control"
            value={user.role}
            disabled
          />
        </div>

        <button className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
