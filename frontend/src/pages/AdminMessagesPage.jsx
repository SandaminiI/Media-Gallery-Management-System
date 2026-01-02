import { useEffect, useState } from "react";
import http from "../api/http";
import MessageList from "../components/MessageList";

export default function AdminMessagesPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    setErr("");
    const { data } = await http.get("/api/admin/contact");
    setItems(data);
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { data } = await http.get("/api/admin/contact");
        if (alive) setItems(data);
      } catch (e) {
        if (alive) setErr(e.response?.data?.message || "Failed to load messages");
      }
    })();

    return () => (alive = false);
  }, []);

  async function onDelete(id) {
    if (!confirm("Delete this message?")) return;
    setMsg("");
    setErr("");
    try {
      await http.delete(`/api/admin/contact/${id}`);
      setMsg("Message deleted");
      await load();
    } catch (e) {
      setErr(e.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div className="container py-4">
      <h3>Admin Messages</h3>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <MessageList items={items} mode="admin" onDelete={onDelete} />
    </div>
  );
}
