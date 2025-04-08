import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  LockOutlined as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setVenderTokenInCookie } from "../../utils/handleVenderToken";
import { jwtDecode } from "jwt-decode";

const VenderLogin = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a trimmed copy of credentials to ensure no
    const trimmedCredentials = {
      email: credentials.email.trim(),
      password: credentials.password.trim()
    };
    
    console.log("Submitting credentials:", trimmedCredentials);
    
    try {
      const response = await axios.post(
        "http://localhost:3003/api/vender/venderUserLogin",
        trimmedCredentials
      );
      
      console.log("Login response:", response);
      
      if (response.status === 200 && response.data.token) {
        // Save 
        const token = response.data.token;
        console.log("token", token);
        
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded token:", decoded);
          
          // Store the token
          setVenderTokenInCookie(token);
          localStorage.setItem("venderToken", token);
          
          // Store user info from the 
          if (response.data.user) {
            localStorage.setItem("vendorInfo", JSON.stringify(response.data.user));
          } else if (response.data.data) {
            localStorage.setItem("vendorInfo", JSON.stringify(response.data.data));
          }
          
          console.log("Saved token:", token);
          console.log("Token in localStorage:", localStorage.getItem("venderToken"));
          console.log("Token in cookie:", document.cookie.includes("venderToken"));
          
          // Navigate to the vendor dashboard
          navigate("/vender");

          // Clear admin token
          document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } catch (error) {
          console.error("Failed to decode token:", error);
          toast.error("Authentication error. Please try again.");
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Failed to login:", error);
      
      // Show detailed error for debugging
      if (error.response) {
        console.log("Error data:", error.response.data);
        const errorMessage = error.response.data.message || 
                            "Invalid credentials. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Connection error. Please check your internet connection.");
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <LockIcon
            sx={{
              fontSize: 48,
              color: "primary.main",
              marginBottom: 2,
            }}
          />
          <Typography component="h1" variant="h5">
            Vender Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              mt: 3,
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default VenderLogin;
