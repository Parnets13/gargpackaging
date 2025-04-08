import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  DialogContentText,
  Badge,
  TextField,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  KeyboardArrowDown as DropdownIcon,
  KeyboardArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { CartContext } from "../../../CartContext";
import { deleteTokenCookie, getTokenFromCookie } from "../../../utils/handleToken";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const { cartTotal } = useContext(CartContext);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElBrand, setAnchorElBrand] = useState(null);
  const [anchorElCategory, setAnchorElCategory] = useState(null);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [logoutModal, setLogoutModal] = useState(false);
  const [userEnquiryModal, setUserEnquiryModal] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gst: "",
  });

  const navigate = useNavigate();

  const checkLoginStatus = useCallback(() => {
    console.group('🔍 Header - Checking Login Status');
    
    const token = getTokenFromCookie();
    const storedToken = localStorage.getItem("user_token");
    const storedUserInfo = localStorage.getItem("userInfo");
    
    console.log('Cookie token exists:', !!token);
    console.log('LocalStorage token exists:', !!storedToken);
    console.log('UserInfo exists:', !!storedUserInfo);
    
    // Verify both token sources match
    if (token && storedToken && token === storedToken && storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setIsLogin(true);
        setUserInfo(parsedUserInfo);
        console.log('✅ User is logged in');
        console.log('User info:', parsedUserInfo);
      } catch (error) {
        console.error('❌ Error parsing user info:', error);
        handleLogout();
      }
    } else {
      console.log('❌ Token mismatch or missing data');
      handleLogout();
    }
    
    console.groupEnd();
  }, []);

  useEffect(() => {
    checkLoginStatus();

    const handleLoginEvent = (event) => {
      console.group('🎯 Login Event Received');
      console.log('Event detail:', event.detail);
      checkLoginStatus();
      console.groupEnd();
    };

    const handleStorageChange = (event) => {
      if (event.key === 'user_token' || event.key === 'userInfo') {
        console.log('🔄 Storage changed:', event.key);
        checkLoginStatus();
      }
    };

    window.addEventListener('user-login', handleLoginEvent);
    window.addEventListener('user-logout', checkLoginStatus);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('user-login', handleLoginEvent);
      window.removeEventListener('user-logout', checkLoginStatus);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkLoginStatus]);

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBrandMenuOpen = (event) => {
    setAnchorElBrand(event.currentTarget);
  };

  const handleBrandMenuClose = () => {
    setAnchorElBrand(null);
  };

  const handleCategoryMenuOpen = (event, brand) => {
    setSelectedBrand(brand);
    setAnchorElCategory(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setAnchorElCategory(null);
  };

  const handleAccountMenuOpen = (event) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorElAccount(null);
  };

  const handleAccountClick = () => {
    console.group('👤 Header - Account Click');
    console.log('Is logged in:', isLogin);
    console.log('User info:', userInfo);
    
    if (isLogin) {
      navigate("/MyAccountOrder");
    } else {
      navigate("/MyAccountSignIn");
    }
    console.groupEnd();
  };

  const handleLogout = () => {
    console.group('🚪 Header - Logout');
    
    // Clear all auth data
    localStorage.removeItem("user_token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("temp_password");
    deleteTokenCookie();
    
    // Reset state
    setIsLogin(false);
    setUserInfo(null);
    
    // Clear axios header
    delete axios.defaults.headers.common['Authorization'];
    
    // Dispatch logout event
    window.dispatchEvent(new Event('user-logout'));
    setLogoutModal(false);
    
    console.log('✅ Logout successful');
    console.groupEnd();
    
    navigate("/MyAccountSignIn");
  };

  const fetchBrandAndCategory = async () => {
    try {
      const [brandResponse, categoryResponse] = await Promise.all([
        axios.get(`http://localhost:3003/api/product/getbrand`),
        axios.get(`http://localhost:3003/api/product/getcategory`),
      ]);
      setBrands(brandResponse.data);
      setCategories(categoryResponse.data);
    } catch (error) {
      console.error("Failed to fetch brands and categories", error);
    }
  };

  useEffect(() => {
    fetchBrandAndCategory();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3003/api/enquiry/adduserenquiry", formData);
      if (response.status === 200) {
        toast.success("Enquiry submitted successfully, We will get back to you Soon");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          gst: "",
        });
        handleCloseUserEnquiryModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseUserEnquiryModal = () => {
    setUserEnquiryModal(false);
  };

  const renderDesktopMenu = () => (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 2,
        color: "black",
      }}
    >
      <Button onClick={handleBrandMenuOpen} endIcon={<DropdownIcon />} sx={{ color: "#ED8019" }}>
        Brands
      </Button>
      <Menu anchorEl={anchorElBrand} open={Boolean(anchorElBrand)} onClose={handleBrandMenuClose}>
        {brands.map((brand) => (
          <MenuItem key={brand._id} onClick={(event) => handleCategoryMenuOpen(event, brand)} sx={{ color: "#ED8019" }}>
            {brand.name}
            <ArrowRightIcon sx={{ ml: 1 }} />
          </MenuItem>
        ))}
      </Menu>
      <Menu
        anchorEl={anchorElCategory}
        open={Boolean(anchorElCategory)}
        onClose={handleCategoryMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category._id}
            onClick={() => {
              navigate(
                `/shop?brand=${encodeURIComponent(selectedBrand.name)}&category=${encodeURIComponent(category.name)}`
              );
              handleCategoryMenuClose();
              handleBrandMenuClose();
            }}
            sx={{ color: "#ED8019" }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>

      <Button sx={{ color: "#ED8019" }} onClick={() => navigate("/shop")}>
        Shop
      </Button>
      <Button
        sx={{ color: "#ED8019" }}
        startIcon={
          <Badge badgeContent={cartTotal} color="primary">
            <ShoppingCartIcon />
          </Badge>
        }
        onClick={() => navigate("/cart")}
      >
        Cart {cartTotal > 0 && `(${cartTotal})`}
      </Button>

      {isLogin && userInfo ? (
        <>
          <Button 
            onClick={handleAccountMenuOpen} 
            endIcon={<DropdownIcon />} 
            sx={{ color: "#ED8019" }}
          >
            {userInfo?.firstname || userInfo?.name || 'My Account'}
          </Button>
          <Menu 
            anchorEl={anchorElAccount} 
            open={Boolean(anchorElAccount)} 
            onClose={handleAccountMenuClose}
          >
            <MenuItem 
              onClick={() => {
                console.log('⚙️ Navigating to MyAccountSetting');
                handleAccountMenuClose();
                navigate("/MyAccountSetting");
              }} 
              sx={{ color: "#ED8019" }}
            >
              Settings
            </MenuItem>
            <MenuItem 
              onClick={() => {
                console.log('🚪 Opening logout modal');
                handleAccountMenuClose();
                setLogoutModal(true);
              }} 
              sx={{ color: "#ED8019" }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            onClick={() => {
              console.log('📝 Opening user enquiry modal');
              setUserEnquiryModal(true);
            }}
            sx={{ backgroundColor: "#ED8019" }}
          >
            Become Member
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log('🔑 Navigating to sign in');
              navigate("/MyAccountSignIn");
            }}
            sx={{ backgroundColor: "#ED8019" }}
          >
            Sign In
          </Button>
        </Box>
      )}
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleMobileMenuToggle}
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary="Brands" />
        </ListItem>
        {brands.map((brand) => (
          <ListItem key={brand._id}>
            <ListItemText primary={brand.name} sx={{ color: "#ED8019" }} />
          </ListItem>
        ))}

        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
        {categories.map((category) => (
          <ListItem key={category._id}>
            <ListItemText primary={category.name} sx={{ color: "#ED8019" }} />
          </ListItem>
        ))}

        <ListItem onClick={() => navigate("/shop")}>
          <ListItemText primary="Shop" sx={{ color: "#ED8019" }} />
        </ListItem>
        <ListItem onClick={() => navigate("/cart")}>
          <ListItemText primary={`Cart`} sx={{ color: "#ED8019" }} />
        </ListItem>

        {isLogin ? (
          <>
            <ListItem onClick={() => navigate("/MyAccountOrder")}>
              <ListItemText primary="My Account" sx={{ color: "#ED8019" }} />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem onClick={() => navigate("/MyAccountSignIn")}>
            <ListItemText primary="Sign In" sx={{ color: "#ED8019" }} />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            width: "100%",
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                marginLeft: "36px",
              }}
            >
              <Tooltip title="Call Us">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 21, color: "#ED8019" }} />
                  <Typography variant="body2" color="textSecondary">
                    +91 98441 92551
                  </Typography>
                </Box>
              </Tooltip>
              <Tooltip title="Email Us">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <EmailIcon sx={{ fontSize: 21, color: "#ED8019" }} />
                  <Typography variant="body2" color="textSecondary">
                    basavamart@gmail.com
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <ul className="flex justify-end align-items-center mt-3" style={{ marginRight: "30px" }}>
              <li className="mx-1">
                <a href="https://www.facebook.com/Basavamart" target="_blank" rel="noopener noreferrer">
                  <i
                    className="fab fa-facebook-f"
                    style={{
                      fontSize: "21px",
                      color: "#ED8019",
                      marginRight: "9px",
                    }}
                  ></i>
                </a>
              </li>
              <li className="mx-1">
                <a
                  href="https://www.youtube.com/channel/UCNdeNpKMe22G2nyd51N3LaA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fab fa-youtube"
                    style={{
                      fontSize: "21px",
                      color: "#ED8019",
                      marginRight: "9px",
                    }}
                  ></i>
                </a>
              </li>
              <li className="mx-1">
                <a
                  href="https://www.linkedin.com/in/prashanth-kumar-b4324b3b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fab fa-linkedin-in"
                    style={{
                      fontSize: "21px",
                      color: "#ED8019",
                      marginRight: "9px",
                    }}
                  ></i>
                </a>
              </li>
              <li className="mx-1">
                <a href="https://www.instagram.com/basava_mart/" target="_blank" rel="noopener noreferrer">
                  <i
                    className="fab fa-instagram"
                    style={{
                      fontSize: "21px",
                      color: "#ED8019",
                      marginRight: "9px",
                    }}
                  ></i>
                </a>
              </li>
            </ul>
          </Box>
        </Box>
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileMenuToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <img src="../img/logo1.png" alt="Basavamart Logo" style={{ height: 75, width: "auto" }} />
          </Link>

          {renderDesktopMenu()}
          {renderMobileMenu()}
        </Toolbar>
      </Container>
      <Dialog open={userEnquiryModal} onClose={handleCloseUserEnquiryModal}>
        <DialogTitle>Become a Member</DialogTitle>
        <form onSubmit={handleSubmitEnquiry}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="lastname"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="gst"
              label="GST Number"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.gst}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUserEnquiryModal} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={logoutModal} onClose={() => setLogoutModal(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;