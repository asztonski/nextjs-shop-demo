"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/app/store/auth";

// Ustaw te same zmienne środowiskowe co w middleware
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const VERIFY_ENDPOINT = process.env.NEXT_PUBLIC_CHECK_USER_ENDPOINT;

export function ValidateUser() {
  const { token, logout } = useAuthStore();

  useEffect(() => {
    if (!token) return;
    // Waliduj token na backendzie przy każdym mount
    fetch(`${API_URL}/${VERIFY_ENDPOINT}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          logout();
        }
      })
      .catch(() => {
        // W przypadku błędu sieci nie wylogowuj (fail-open)
      });
  }, [token, logout]);

  return null;
}
