import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import http from "../api/http";

export default function VerifyOtpPage() {
  const nav = useNavigate();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const presetEmail = params.get("email") || "";

  const [email, setEmail] = useState(presetEmail);
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await http.post("/api/auth/verify-otp", { email, otp });
      nav("/login");
    } catch (e2) {
      setErr(e2.response?.data?.message || "OTP verification failed");
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Verify OTP</h1>

      <form onSubmit={submit} className="card p-4">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Verify
        </button>

        {err && <div className="text-danger mt-2">{err}</div>}
      </form>
    </div>
  );
}
