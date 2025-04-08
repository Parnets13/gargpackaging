import React from "react";
import { Navigate } from "react-router-dom";
import { getAdminTokenFromCookie } from "../../utils/handleAdminToken";
import { jwtDecode } from "jwt-decode";

function AdminProtectedRoute({ children }) {
  const adminToken = getAdminTokenFromCookie();
  
  console.log("AdminProtectedRoute - checking token:", !!adminToken);
  
  if (!adminToken) {
    console.log("No admin token found");
    return <Navigate to="/admin-login" />;
  }

  try {
    const decoded = jwtDecode(adminToken);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      console.log("Admin token expired");
      return <Navigate to="/admin-login" />;
    }

    // Token is valid
    return children;
  } catch (error) {
    console.error("Error validating admin token:", error);
    return <Navigate to="/admin-login" />;
  }
}

export default AdminProtectedRoute; 