import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CreditCard as GstIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { deleteTokenCookie, getTokenFromCookie } from "../../utils/handleToken";

const MyAccountSetting = () => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gst: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const checkAuth = () => {
      console.group('🔒 MyAccountSetting - Auth Check');
      const token = getTokenFromCookie();
      const userInfo = localStorage.getItem("userInfo");
      
      console.log('Token exists:', !!token);
      console.log('UserInfo exists:', !!userInfo);
      
      if (!token || !userInfo) {
        console.log('❌ Not authenticated, redirecting to login');
        toast.error("Please log in first");
        navigate("/MyAccountSignIn");
        console.groupEnd();
        return false;
      }
      
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        console.log('Parsed user info:', parsedUserInfo);
        if (!parsedUserInfo.id) {
          console.log('❌ Invalid user info');
          toast.error("Invalid user session");
          navigate("/MyAccountSignIn");
          return false;
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
        toast.error("Invalid user session");
        navigate("/MyAccountSignIn");
        return false;
      }
      
      console.log('✅ User is authenticated');
      console.groupEnd();
      return true;
    };

    setLoading(true); // Set loading when component mounts
    if (checkAuth()) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const getUser = async () => {
    console.group('👤 MyAccountSetting - Fetching User Data');
    const token = getTokenFromCookie();
    const userInfo = localStorage.getItem("userInfo");
    
    try {
      console.log('Token:', token);
      const parsedUserInfo = JSON.parse(userInfo);
      console.log('Stored user info:', parsedUserInfo);
      console.log('Making API request...');

      // Get all users and filter for current user
      const response = await axios.get(
        `http://localhost:3003/api/auth/getuser`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            role: parsedUserInfo.role // Add role if available
          }
        }
      );
      
      console.log('API Response:', response);
      
      if (response.status === 200) {
        // Find the current user from the users array
        const currentUser = response.data.find(user => user._id === parsedUserInfo.id);
        
        if (!currentUser) {
          console.error('Current user not found in response');
          toast.error("User data not found");
          return;
        }

        console.log('Current user data:', currentUser);
        
        setUser(currentUser);
        setFormData({
          firstname: currentUser.firstname || "",
          lastname: currentUser.lastname || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          gst: currentUser.gst || "",
          password: "",
          confirmPassword: "",
        });
        
        console.log('✅ User data set successfully');
        console.log('Updated form data:', {
          ...currentUser,
          password: '[HIDDEN]',
          confirmPassword: '[HIDDEN]'
        });
      }
    } catch (error) {
      console.group('❌ Error fetching user data');
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: {
            ...error.config?.headers,
            Authorization: '[HIDDEN]'
          }
        }
      });
      console.groupEnd();
      
      if (error.response?.status === 404) {
        toast.error("User not found");
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/MyAccountSignIn");
      } else {
        toast.error("Failed to fetch user details. " + (error.response?.data?.message || ''));
      }
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("Please log in first");
      navigate("/MyAccountSignIn");
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const updateData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      gst: formData.gst,
      password: formData.password,
    };

    try {
      const response = await axios.put(
        "http://localhost:3003/api/auth/userupdate",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Account updated successfully!");
        // Refresh user data after update
        getUser();
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          toast.warning(
            "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."
          );
        } else {
          toast.error(error.response.data.message || "An error occurred!");
        }
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  const handleDeleteUser = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("Please log in first");
      navigate("/MyAccountSignIn");
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:3003/api/auth/userdelete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Account deleted successfully");
        deleteTokenCookie();
        navigate("/MyAccountSignIn");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <Box sx={{minHeight:'100vh'}}>
      <ToastContainer />
      <Grid container spacing={3}>
        {/* Account Settings Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" gutterBottom>
              Account Settings
            </Typography>

            <Box component="form" onSubmit={handleUserUpdate} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    type="text"
                    name="gst"
                    value={formData.gst}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: "#C95E18",
                      "&:hover": { backgroundColor: "#A64E11" },
                    }}
                  >
                    Save Details
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Delete Account
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Would you like to delete your account?
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                I want to delete my account
              </Button>
            </Box>
          </Paper>
        </Grid>
        {/* User Details Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f5f5f5",
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#C95E18",
                }}
              >
                <PersonIcon sx={{ mr: 2 }} /> User Profile
              </Typography>
              <Divider sx={{ my: 2 }} />
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                  <CircularProgress />
                </Box>
              ) : user ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PersonIcon sx={{ mr: 2, color: "text.secondary" }} />
                    <Typography variant="body1">
                      {user.firstname} {user.lastname}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EmailIcon sx={{ mr: 2, color: "text.secondary" }} />
                    <Typography variant="body1">{user.email}</Typography>
                  </Box>
                  {user.phone && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PhoneIcon sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">{user.phone}</Typography>
                    </Box>
                  )}
                  {user.gst && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <GstIcon sx={{ mr: 2, color: "text.secondary" }} />
                      <Typography variant="body1">{user.gst}</Typography>
                    </Box>
                  )}
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No user details available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAccountSetting;
