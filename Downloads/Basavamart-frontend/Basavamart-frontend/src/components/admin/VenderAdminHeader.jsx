import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Container,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getVenderTokenFromCookie, deleteVenderTokenCookie } from "../../utils/handleVenderToken";
import Cookies from "js-cookie";
import { deleteTokenCookie } from "../../utils/handleToken"; // Adjust import path as needed
import { deleteAdminTokenCookie } from "../../utils/handleAdminToken";

// Import your page components
import Users from "./Users";
import Products from "./Products";
import Enquiries from "./Enquiries";
import Orders from "./Orders";
import UserEnquiry from "./UserEnquiry";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import VenderAddProduct from "./VenderAddProducts"; // Import this instead of using AddProduct directly
import VenderStockManagement from "./VenderStockManagement"; // Import the stock management component
import VenderBookingHistory from "./VenderBookingHistory"; // Import the booking history component
import Testimonials from "./Testimonials";
import Banner from "./Banner";

const VenderHeader = ({ vendorInfo }) => {
  const [activePage, setActivePage] = useState("Add Products");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    const venderToken = getVenderTokenFromCookie();
    console.log("VenderAdminHeader - checking token:", !!venderToken);
    
    if (venderToken) {
      try {
        const decoded = jwtDecode(venderToken);
        console.log("VenderAdminHeader - decoded token:", decoded);
        
        // No need to check for role since we're already validating in protected route
      } catch (error) {
        console.error("Error validating vendor token:", error);
        navigate("/vender-login");
      }
    } else {
      console.log("VenderAdminHeader - no token found, redirecting to login");
      navigate("/vender-login");
    }
  }, [navigate]);

  const handlePageClick = (page) => {
    setActivePage(page);
    if (isMobile) setIsDrawerOpen(false);

    // Close products dropdown if not a products-related page
    if (
      !["Add Products", "Product List"].includes(page)
    ) {
      setIsProductsOpen(false);
    }
  };

  const handleLogout = () => {
    deleteVenderTokenCookie();
    localStorage.removeItem("venderToken");
    Cookies.remove("venderToken");
    setIsLogoutDialogOpen(false);
    navigate("/vender-login");
  };

  const renderActivePage = () => {
    const pageMap = {
      "Add Products": <VenderAddProduct />, // Use VenderAddProduct instead of AddProduct
      "Product List": <ProductList />,
      "Stock Management": <VenderStockManagement />, // Add Stock Management component
      "Booking History": <VenderBookingHistory />, // Add Booking History component
    };
    return pageMap[activePage] || <VenderAddProduct />; // Default to VenderAddProduct
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: 240,
        height: "100%",
        pt: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {[ 
          { label: "Add Product", value: "Add Products" },
          { label: "Products List", value: "Product List" },
          { label: "Stock Management", value: "Stock Management" },
          { label: "Booking History", value: "Booking History" }
        ].map((item) => (
          <ListItem
            key={item.value}
            disablePadding
            sx={{
              borderBottom: "1px solid #e0e0e0",
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <ListItemButton
              onClick={() => handlePageClick(item.value)}
              selected={activePage === item.value}
              sx={{
                backgroundColor:
                  activePage === item.value
                    ? "rgba(0, 0, 0, 0.08)"
                    : "transparent",
                "&.Mui-selected:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <ListItemText sx={{ color: "#E55814" }} primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
  
      {/* Logout Button */}
      <ListItem
        disablePadding
        sx={{
          borderTop: "1px solid #e0e0e0",
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
        }}
      >
        <ListItemButton
          onClick={() => setIsLogoutDialogOpen(true)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#d32f2f",
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.04)",
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1 }} />
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontWeight: "bold" }}
          />
        </ListItemButton>
      </ListItem>
    </Box>
  );
  
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "white",
            color: "black",
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                <img
                  src="../img/logo1.png"
                  alt="logo"
                  style={{ height: "75px", width: "120px" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Vender Panel
              </Typography>
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Box
            sx={{
              width: 240,
              flexShrink: 0,
              height: "100%",
              borderRight: "1px solid #e0e0e0",
              color: "#E55814",
            }}
          >
            <SidebarContent />
          </Box>
        )}

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          <SidebarContent />
        </Drawer>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: "64px",
            ml: { xs: 0 },
            backgroundColor: "#f4f4f4",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          {renderActivePage()}
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out of the vendor panel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsLogoutDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="primary"
            variant="contained"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VenderHeader;