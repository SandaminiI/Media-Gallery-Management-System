import { useEffect, useState } from "react";
import http from "../api/http";
import MessageList from "../components/MessageList";

export default function MyMessagesPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    setErr("");
    const { data } = await http.get("/api/contact/my-messages");
    setItems(data);
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { data } = await http.get("/api/contact/my-messages");
        if (alive) setItems(data);
      } catch (e) {
        if (alive) setErr(e.response?.data?.message || "Failed to load messages");
      }
    })();

    return () => (alive = false);
  }, []);

  async function onEdit(item, newText) {
    setMsg("");
    setErr("");
    try {
      await http.put(`/api/contact/${item._id}`, { message: newText });
      setMsg("Message updated");
      await load();
    } catch (e) {
      setErr(e.response?.data?.message || "Update failed");
    }
  }

  async function onDelete(id) {
    if (!confirm("Delete this message?")) return;
    setMsg("");
    setErr("");
    try {
      await http.delete(`/api/contact/${id}`);
      setMsg("Message deleted");
      await load();
    } catch (e) {
      setErr(e.response?.data?.message || "Delete failed");
    }
  }

  return (
    <div className="container py-4">
      <h3>My Messages</h3>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <MessageList items={items} mode="user" onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
