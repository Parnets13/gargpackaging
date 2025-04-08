import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings as AdminIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAdminSession } from "../../utils/adminAuth";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use the admin-specific endpoint
      const response = await axios.post(
        "http://localhost:3003/api/auth/login", // Changed from /api/auth/login to /api/admin/login
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Admin login response:", response);

      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        
        try {
          // Verify token and check role
          const decoded = jwtDecode(token);
          console.log("Decoded admin token:", decoded);
          
          if (decoded.role !== 'admin') {
            toast.error("Invalid admin credentials");
            return;
          }
          
          // Set admin session
          setAdminSession(token, response.data.user);
          
          toast.success("Admin login successful");
          navigate("/admin");
        } catch (error) {
          console.error("Token validation failed:", error);
          toast.error("Authentication failed");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <AdminIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Admin Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleChange}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
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
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminLogin;
