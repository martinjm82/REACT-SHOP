import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ auth, requiredRole = "user", children }) {
  const role = auth?.role ?? "guest";

  const roleRank = { guest: 0, user: 1, admin: 2 };
  const ok = roleRank[role] >= roleRank[requiredRole];

  if (!ok) return <Navigate to="/login" replace />;

  return children;
}
