import React, { useEffect, useState } from "react";
import http from "../api/http";

export default function SharedGalleryPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { data } = await http.get("/api/media/shared");
        if (alive) setItems(data);
      } catch (e) {
        if (alive)
          setErr(e.response?.data?.message || "Failed to load shared media");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="container py-4">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Shared Gallery</h2>
        <p className="text-muted mb-0">
          Media shared with you
        </p>
      </div>

      {/* Error */}
      {err && <div className="alert alert-danger">{err}</div>}

      {/* Loading */}
      {loading && (
        <div className="text-center text-muted py-5">
          Loading shared media...
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="alert alert-secondary text-center">
          No shared media found
        </div>
      )}

      {/* Gallery */}
      <div className="row g-3">
        {items.map((m) => (
          <div key={m._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              
              <img
                src={m.url}
                alt={m.title || m.originalName}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h6
                  className="card-title text-truncate"
                  title={m.title || m.originalName}
                >
                  {m.title || m.originalName}
                </h6>

                {m.tags?.length > 0 && (
                  <div className="mt-2">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="badge bg-secondary me-1 mb-1"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
