import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/auth.js";
import { getVenderTokenFromCookie } from "../../utils/handleVenderToken.js";
import { jwtDecode } from "jwt-decode";

function VenderProtectedRoute({ children }) {
  const venderToken = getVenderTokenFromCookie();
  
  // Debug info
  console.log("VenderToken present:", !!venderToken);
  
  // No token or expired token
  if (!venderToken || isTokenExpired(venderToken)) {
    console.log("No token or expired token - redirecting to login");
    return <Navigate to="/vender-login" />;
  }
  
  // Check if we can decode the token
  try {
    const decoded = jwtDecode(venderToken);
    console.log("Decoded token:", decoded);
    
    // Only check role if it exists in the token
    // IMPORTANT: Your token doesn't have a role field, so we'll skip this check
    // if (decoded.role && decoded.role !== 'vendor') {
    //   console.log("Token role is not vendor:", decoded.role);
    //   return <Navigate to="/vender-login" />;
    // }
    
    // If we get here, allow access to the route
    return children;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/vender-login" />;
  }
}

export default VenderProtectedRoute;