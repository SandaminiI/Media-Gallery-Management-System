import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../api/http";
import { useAuth } from "../context/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const [stats, setStats] = useState({ total: 0, shared: 0, recent: [] });
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setErr("");
        const { data } = await http.get("/api/media/my/stats");
        if (alive) setStats(data);
      } catch (e) {
        if (alive) setErr(e.response?.data?.message || "Failed to load dashboard");
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">Dashboard</h3>
        <button onClick={logout} className="btn btn-outline-dark btn-sm">
          Logout
        </button>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      <div className="row g-3">
        {/* Profile card */}
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <div className="text-muted small">Logged in as</div>
              <div className="fw-semibold mt-1">{user?.name}</div>
              <div className="small">{user?.email}</div>
              <div className="small mt-2">
                Role: <span className="badge text-bg-secondary">{user?.role}</span>
              </div>

              <Link to="/profile" className="btn btn-primary btn-sm mt-3">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="col-12 col-lg-8">
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Total uploads</div>
                  <div className="display-6">{stats.total}</div>
                  <Link to="/gallery" className="btn btn-outline-dark btn-sm mt-2">
                    Go to Gallery
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Shared items</div>
                  <div className="display-6">{stats.shared}</div>
                  <Link to="/shared" className="btn btn-outline-dark btn-sm mt-2">
                    View Shared
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent uploads */}
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title m-0">Recent uploads</h5>
                    <Link to="/gallery" className="small">
                      View all
                    </Link>
                  </div>

                  {stats.recent?.length === 0 ? (
                    <div className="text-muted mt-3">No uploads yet.</div>
                  ) : (
                    <div className="row g-2 mt-2">
                      {stats.recent.map((m) => (
                        <div key={m._id} className="col-6 col-md-4 col-lg-4">
                          <div className="border rounded p-2">
                            <img
                              src={m.url}
                              alt=""
                              className="img-fluid rounded"
                              style={{ height: 120, width: "100%", objectFit: "cover" }}
                            />
                            <div className="small fw-semibold text-truncate mt-2">
                              {m.title || m.originalName}
                            </div>
                            <div className="small text-muted">
                              {new Date(m.createdAt).toLocaleDateString()}{" "}
                              {m.isShared ? <span className="badge text-bg-success ms-1">Shared</span> : null}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: quick links */}
      <div className="mt-4 d-flex gap-2 flex-wrap">
        <Link to="/contact" className="btn btn-outline-primary btn-sm">
          Contact Us
        </Link>
        <Link to="/my-messages" className="btn btn-outline-primary btn-sm">
          My Messages
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin/messages" className="btn btn-outline-danger btn-sm">
            Admin Messages
          </Link>
        )}
      </div>
    </div>
  );
}
