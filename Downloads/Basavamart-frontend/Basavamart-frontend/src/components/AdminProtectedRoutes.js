import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";
import { getAdminTokenFromCookie } from "../utils/handleAdminToken";

function AdminProtectedRoute({ children }) {
  const adminToken = getAdminTokenFromCookie();
  
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log("AdminToken:", adminToken ? "Present" : "Not present");
    if (adminToken) {
      console.log("AdminToken expired:", isTokenExpired(adminToken));
    }
  }
  
  // Redirect to admin login if token is missing or expired
  if (!adminToken || isTokenExpired(adminToken)) {
    return <Navigate to="/admin-login" />;
  }

  return children;
}

export default AdminProtectedRoute;