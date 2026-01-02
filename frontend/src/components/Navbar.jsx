import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Media Gallery
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          {/* Navigation */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {user && <NavItem to="/dashboard" label="Dashboard" />}
            {user && <NavItem to="/profile" label="Profile" />}

            <NavItem to="/gallery" label="Gallery" />
            <NavItem to="/shared" label="Shared" />
            <NavItem to="/contact" label="Contact" />

            {user && <NavItem to="/my-messages" label="My Messages" />}

            {user?.role === "admin" && (
              <>
                <NavItem to="/admin/messages" label="All Messages" />
                <NavItem to="/admin/users" label="User Management" />
              </>
            )}
          </ul>

          {/* Right actions */}
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <span className="small text-muted d-none d-md-inline">
                  {user.email}
                </span>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={logout}
                  type="button"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-primary btn-sm" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary btn-sm" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Reusable Nav Item ---------- */

function NavItem({ to, label }) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={to}>
        {label}
      </NavLink>
    </li>
  );
}
