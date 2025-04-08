import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import "./CustomStyles.css";
import { getAdminTokenFromCookie } from "../../utils/handleAdminToken";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import VenderAddProduct from "./VenderAddProducts";
import { validateAdminToken } from '../../utils/adminAuth';

const Main = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminAuth = async () => {
    try {
      const token = getAdminTokenFromCookie();
      console.log("Admin token check:", token ? "Present" : "Not found");
      
      if (!token) {
        console.log("No admin token found, redirecting to login");
        navigate("/admin-login");
        return;
      }

      // First check token expiration locally
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          console.log("Token expired locally, redirecting to login");
          navigate("/admin-login");
          return;
        }

        // Token is valid locally, now verify with backend
        const response = await axios.get(
          "http://localhost:3003/api/auth/isAdmin",
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("Admin verification response:", response.data);

        if (!response.data.isAdmin) {
          console.log("User is not admin, redirecting");
          navigate("/admin-login");
        }
      } catch (error) {
        console.error("Token validation error:", error);
        
        // Check if it's an authentication error
        if (error.response?.status === 401) {
          console.log("Authentication failed, clearing tokens and redirecting");
          // Clear tokens
          document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminInfo");
          navigate("/admin-login");
        }
      }
    } catch (error) {
      console.error("Admin check error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAuth();
    // Add interval to check token validity periodically
    const interval = setInterval(checkAdminAuth, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <Box>
      <Helmet>
        <title>Admin - BasavaMart</title>
      </Helmet>
      <AdminHeader />
    </Box>
  );
};

export default Main;
