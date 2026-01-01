import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import http from "../api/http";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const nav = useNavigate();
  const { loadMe } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await http.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      await loadMe();
      nav("/dashboard");
    } catch (e2) {
      setErr(e2.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogleSuccess(cred) {
    try {
      const { data } = await http.post("/api/auth/google", {
        credential: cred.credential,
      });
      localStorage.setItem("token", data.token);
      await loadMe();
      nav("/dashboard");
    } catch {
      setErr("Google login failed");
    }
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "420px" }}>
        <h3 className="text-center mb-1">Welcome Back</h3>
        <p className="text-center text-muted mb-4">
          Login to your account
        </p>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <Link to="/forgot" className="small">
              Forgot password?
            </Link>
            <Link to="/register" className="small">
              Create account
            </Link>
          </div>

          <button
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr className="my-4" />

        <div className="text-center">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={() => setErr("Google login failed")}
          />
        </div>
      </div>
    </div>
  );
}
