import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";

export default function ForgotPasswordPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await http.post("/api/auth/forgot-password", { email });
      setMsg("OTP sent (if account exists).");
      nav(`/reset?email=${encodeURIComponent(email)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ width: "420px" }}>
        
        {/* Header */}
        <h3 className="text-center mb-1">Forgot Password</h3>
        <p className="text-center text-muted mb-4">
          We’ll send an OTP to reset your password
        </p>

        {/* Success Message */}
        {msg && <div className="alert alert-success">{msg}</div>}

        {/* Form */}
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

          <button
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
