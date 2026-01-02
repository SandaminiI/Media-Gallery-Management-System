import { useEffect, useState } from "react";
import http from "../api/http";
import { useAuth } from "../context/useAuth";

export default function ContactForm() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);

    try {
      await http.post("/api/contact", { name, email, message });
      setMsg("Message submitted successfully!");
      setMessage("");
    } catch (e2) {
      setErr(e2.response?.data?.message || "Submit failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card p-3">
      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          className="form-control"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
