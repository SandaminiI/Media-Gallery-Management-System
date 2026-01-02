import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import http from "../api/http";

export default function MediaDetailPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Items passed from gallery (for slider)
  const passedItems = location.state?.items || [];

  const [items, setItems] = useState(passedItems);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(passedItems.length === 0);

  // Load items if not passed from gallery
  useEffect(() => {
    let alive = true;

    (async () => {
      if (passedItems.length > 0) return;

      try {
        setErr("");
        setLoading(true);
        const { data } = await http.get("/api/media");
        if (!alive) return;
        setItems(data);
      } catch (e) {
        if (alive) {
          setErr(e.response?.data?.message || "Failed to load media");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [passedItems.length]);

  const activeIndex = items.findIndex((x) => x._id === id);
  const active = activeIndex >= 0 ? items[activeIndex] : null;

  function prev() {
    if (items.length === 0) return;
    const prevIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
    nav(`/media/${items[prevIndex]._id}`, {
      replace: true,
      state: { items },
    });
  }

  function next() {
    if (items.length === 0) return;
    const nextIndex = activeIndex >= items.length - 1 ? 0 : activeIndex + 1;
    nav(`/media/${items[nextIndex]._id}`, {
      replace: true,
      state: { items },
    });
  }

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (err) {
    return (
      <div className="container mt-4 alert alert-danger">
        {err}
      </div>
    );
  }

  if (!active) {
    return (
      <div className="container mt-4 alert alert-warning">
        Media not found
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          {active.title || active.originalName}
        </h4>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => nav("/gallery")}
        >
          Back
        </button>
      </div>

      <div className="card p-3">
        <img
          src={active.url}
          alt={active.originalName}
          className="img-fluid rounded"
          style={{ maxHeight: "70vh", objectFit: "contain" }}
        />

        <hr />

        {/* Metadata */}
        <div className="row g-2">
          <div className="col-md-6">
            <div><b>File:</b> {active.originalName}</div>
            <div><b>Shared:</b> {active.isShared ? "Yes" : "No"}</div>
            <div>
              <b>Uploaded:</b>{" "}
              {new Date(active.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="col-md-6">
            <div>
              <b>Description:</b> {active.description || "-"}
            </div>
            <div>
              <b>Tags:</b>{" "}
              {(active.tags && active.tags.length > 0)
                ? active.tags.join(", ")
                : "-"}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-dark"
            onClick={prev}
            disabled={items.length <= 1}
          >
            Prev
          </button>
          <button
            className="btn btn-dark"
            onClick={next}
            disabled={items.length <= 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
