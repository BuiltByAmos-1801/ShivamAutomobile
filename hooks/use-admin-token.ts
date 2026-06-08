"use client";

import { useEffect, useState } from "react";

export function useAdminToken() {
  const [token, setTokenState] = useState("");
  useEffect(() => setTokenState(localStorage.getItem("shivam_admin_token") ?? ""), []);
  function setToken(next: string) {
    localStorage.setItem("shivam_admin_token", next);
    setTokenState(next);
  }
  function clearToken() {
    localStorage.removeItem("shivam_admin_token");
    setTokenState("");
  }
  return { token, setToken, clearToken };
}
