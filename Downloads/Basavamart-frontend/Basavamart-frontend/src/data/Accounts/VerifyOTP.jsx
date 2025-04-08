import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthServices from "./AuthServices";
import { toast } from "react-toastify";
import { Box, Container, Paper, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("user_token");
    if (token) {
      navigate('/');
      return;
    }

    // Set email from navigation state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      navigate('/MyAccountSignIn');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.group('🔑 OTP Verification Submission');
    console.log('Verification data:', {
      email,
      otp: otp.trim()
    });

    try {
      const verifyResponse = await AuthServices.verifyOTP({
        email,
        otp: otp.trim()
      });

      console.log('Verification response:', {
        status: verifyResponse.status,
        data: verifyResponse.data
      });

      if (verifyResponse.data.token) {
        console.log('✅ Email verified successfully');

        try {
          const storedPassword = localStorage.getItem("temp_password");
          console.log('Attempting auto-login with stored password');

          if (storedPassword) {
            const loginResponse = await AuthServices.login({
              email,
              password: storedPassword
            });

            console.log('Auto-login response:', {
              status: loginResponse.status,
              data: loginResponse.data
            });

            localStorage.removeItem("temp_password");
            console.log('✅ Auto-login successful, redirecting to home');
            window.location.href = '/';
          }
        } catch (loginError) {
          console.group('❌ Auto-login Error');
          console.error('Error details:', loginError);
          console.groupEnd();
          navigate('/MyAccountSignIn');
        }
      }
    } catch (error) {
      console.group('❌ OTP Verification Error');
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.groupEnd();

      if (error.response) {
        setError(error.response.data.message || "Invalid OTP");
      } else {
        setError("Network error. Please try again");
      }
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  };

  if (!email) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Verify Your Email
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Please enter the OTP sent to your email address
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            disabled
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
            disabled={loading}
            sx={{ mb: 3 }}
            inputProps={{
              maxLength: 6,
              pattern: "[0-9]*"
            }}
            helperText="Enter the 6-digit OTP sent to your email"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ 
              mt: 2,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Verify OTP"
            )}
          </Button>

          <Button
            fullWidth
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/MyAccountSignIn')}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyOTP;