"use server";

import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * Server Action to store activation email in cookies
 * This allows the activation page to access the email without passing it through URL
 */
export async function setActivationEmail(email: string) {
  const cookieStore = await cookies();

  // Set cookie with email, expires in 1 hour
  cookieStore.set("activation_email", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}

/**
 * Server Action to set temporary access token for activation page
 * This prevents direct URL access and allows only flow-based access
 */
export async function setActivationAccess() {
  const cookieStore = await cookies();

  // Generate unique token with timestamp
  const token = crypto.randomBytes(32).toString("hex");
  const timestamp = Date.now().toString();
  const accessToken = `${token}.${timestamp}`;

  // Set short-lived access token (5 minutes)
  cookieStore.set("activation_access", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 5 * 60, // 5 minutes
    path: "/activation-required",
  });
}

/**
 * Server Action to clear activation access token after page is accessed
 * Ensures one-time access only
 */
export async function clearActivationAccess() {
  const cookieStore = await cookies();
  cookieStore.delete("activation_access");
}

/**
 * Server Action to clear activation email cookie
 */
export async function clearActivationEmail() {
  const cookieStore = await cookies();
  cookieStore.delete("activation_email");
}
