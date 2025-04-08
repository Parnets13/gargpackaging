import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";
import { getTokenFromCookie } from "../utils/handleToken";

function ProtectedRoute({ children }) {
  const token = getTokenFromCookie()

  // Redirect to login if token is missing or expired
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/admin-login" />;
  }

  return children;
}

export default ProtectedRoute;