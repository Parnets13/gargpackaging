import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import AuthServices from "./AuthServices";
import { toast } from "react-toastify";

// Styled components for enhanced aesthetics
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  boxShadow: theme.shadows[4],
  maxWidth: 450,
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.01)",
  },
}));

const MyAccountSignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'email') {
      // Clear any existing errors
      setError("");
      
      // Check if it's an admin email
      if (value.toLowerCase() === "admin5@gmail.com") {
        setError("Invalid email address");
        toast.error("Invalid email address");
      }
    }
    
    setFormData({ 
      ...formData, 
      [name]: value.trim() 
    });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (formData.email.toLowerCase() === "admin5@gmail.com") {
        console.log('Admin login attempted through user login');
        setError("Invalid email address");
        toast.error("Invalid email address");
        setLoading(false);
        return;
      }

      console.log("Attempting login with:", {
        email: formData.email,
        password: '********'
      });

      const response = await AuthServices.login(formData);
      console.log("Login response:", {
        status: response.status,
        hasToken: !!response.data.token,
        user: response.data.user
      });

      if (response.data.token) {
        if (response.data.user.role === 'admin') {
          console.log(' Admin account detected');
          localStorage.clear();
          setError("Invalid email address");
          // toast.error("Invalid email address");
          return;
        }

        toast.success("Login successful!");
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          if (error.response.data.message === "Admin access denied") {
            setError("Invalid email address");
            toast.error("Invalid email address");
            return;
          }
          localStorage.setItem("temp_password", formData.password);
          toast.info("Please verify your email first");
          navigate("/verify-otp", { 
            state: { email: formData.email }
          });
        } else {
          const errorMessage = error.response.data.message || "Login failed";
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } else {
        setError("Network error. Please try again");
        toast.error("Network error. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
        backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Container maxWidth="xs">
        <StyledPaper elevation={4}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: "bold",
              textAlign: "center",
              color: "#333",
            }}
          >
            User Sign In
          </Typography>

          {error && (
            <Alert 
              severity="error"
              sx={{ width: "100%", mb: 2 }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              required
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              disabled={loading}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
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
              color="primary"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Sign Up Link */}
            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                style={{ 
                  textDecoration: "none", 
                  fontWeight: "bold",
                  color: "#1976d2"
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default MyAccountSignIn;