import React, { useEffect, useState } from "react";
import http from "../api/http";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function loadMe() {
    const token = localStorage.getItem("token");
    if (!token) return setUser(null);

    try {
      const { data } = await http.get("/api/auth/me");
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    let alive = true;

    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        if (alive) setUser(null);
        return;
      }

      try {
        const { data } = await http.get("/api/auth/me");
        if (alive) setUser(data);
      } catch {
        localStorage.removeItem("token");
        if (alive) setUser(null);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
