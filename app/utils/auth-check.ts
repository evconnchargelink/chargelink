// utils/auth-check.ts

import { getItem } from "./storage";

export async function isAuthenticated(): Promise<boolean> {
  const token = await getItem("auth_token");
  return !!token; // true if token exists
}

export async function logoutUser(): Promise<void> {
  await Promise.all([
    removeItem("auth_token"),
    removeItem("user_details"),
  ]);
}
