import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";
import ZipDownloadPanel from "../components/ZipDownloadPanel";
import EditMediaModal from "../components/EditMediaModal";

export default function GalleryPage() {
  const nav = useNavigate();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [err, setErr] = useState("");

  const [editItem, setEditItem] = useState(null);

  async function load(q = "") {
    setErr("");
    try {
      const { data } = await http.get(`/api/media${q ? `?q=${encodeURIComponent(q)}` : ""}`);
      setItems(data);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to load media");
    }
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { data } = await http.get("/api/media");
        if (alive) setItems(data);
      } catch (e) {
        if (alive) setErr(e.response?.data?.message || "Failed to load media");
      }
    })();

    return () => (alive = false);
  }, []);

  function toggleSelect(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function remove(id) {
    if (!confirm("Delete this item?")) return;
    try {
      await http.delete(`/api/media/${id}`);
      setSelected((prev) => prev.filter((x) => x !== id));
      await load(search);
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  }

  async function toggleShare(id) {
    try {
      await http.patch(`/api/media/${id}/share`);
      await load(search);
    } catch (e) {
      alert(e.response?.data?.message || "Share toggle failed");
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3 gap-2">
        <h1 className="mb-0">Media Gallery</h1>

        <div className="d-flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="form-control"
          />
          <button type="button" onClick={() => load(search)} className="btn btn-dark">
            Search
          </button>

          <button type="button" onClick={() => nav("/upload")} className="btn btn-primary">
            Upload
          </button>
        </div>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      {/* ZIP Download Panel */}
      <ZipDownloadPanel items={items} selected={selected} setSelected={setSelected} />

      {/* Grid */}
      <div className="row g-3">
        {items.map((m) => (
          <div key={m._id} className="col-12 col-sm-6 col-md-4">
            <div className="card">
              <img
                src={m.url}
                alt=""
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover", cursor: "pointer" }}
                onClick={() => nav(`/media/${m._id}`, { state: { items } })}
              />

              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fw-bold text-truncate">{m.title || m.originalName}</div>
                    <div className="small mt-1">
                      {m.isShared ? (
                        <span className="text-success">Shared</span>
                      ) : (
                        <span className="text-muted">Private</span>
                      )}
                    </div>
                    {m.tags?.length > 0 && (
                      <div className="small text-muted">
                        {m.tags.map((t, i) => (
                          <span key={`${t}-${i}`}>#{t} </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="checkbox"
                    checked={selected.includes(m._id)}
                    onChange={() => toggleSelect(m._id)}
                  />
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-sm btn-secondary" onClick={() => setEditItem(m)}>
                    Edit
                  </button>

                  <button
                    className={`btn btn-sm ${m.isShared ? "btn-success" : "btn-primary"}`}
                    onClick={() => toggleShare(m._id)}
                  >
                    {m.isShared ? "Shared" : "Share"}
                  </button>

                  <button className="btn btn-sm btn-danger" onClick={() => remove(m._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editItem && (
        <EditMediaModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSaved={() => load(search)}
        />
      )}
    </div>
  );
}
