import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import VenderAdminHeader from "./VenderAdminHeader";
import { Helmet } from "react-helmet";
import { getVenderTokenFromCookie } from "../../utils/handleVenderToken";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const VenderMain = () => {
  const [vendorInfo, setVendorInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get vendor info from token
    const token = getVenderTokenFromCookie();
    console.log("Vendor token retrieved:", token ? "Found" : "Not found");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded vendor token:", decoded);
        
        // Check for user info in localStorage as a backup
        const storedUserInfo = localStorage.getItem("vendorInfo");
        let parsedInfo = null;
        
        if (storedUserInfo) {
          try {
            parsedInfo = JSON.parse(storedUserInfo);
          } catch (e) {
            console.error("Error parsing stored vendor info:", e);
          }
        }
        
        // Set vendor info from token and stored info
        setVendorInfo({
          id: decoded.id,
          // Use the data from your backend response
          ...(parsedInfo || {})
        });
        
        setError(null);
      } catch (error) {
        console.error("Error decoding token:", error);
        setError("Failed to decode vendor token. Please log in again.");
      }
    } else {
      setError("No vendor token found. Please log in.");
    }
  }, []);
  
  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error" variant="h6" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/vender-login')}
          sx={{ mt: 2 }}
        >
          Go to Vendor Login
        </Button>
      </Box>
    );
  }
  
  return (
    <Box>
      <Helmet>
        <title>Vendor - BasavaMart</title>
      </Helmet>
      <VenderAdminHeader vendorInfo={vendorInfo} />
    </Box>
  );
};

export default VenderMain;
