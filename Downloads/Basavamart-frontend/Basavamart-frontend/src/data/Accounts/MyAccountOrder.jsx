import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsIcon,
  LocationOn as LocationOnIcon,
  Menu as MenuIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MyAcconutSetting from "./MyAcconutSetting";
import MyAccountAddress from "./MyAccountAddress";
import { deleteTokenCookie, getTokenFromCookie } from "../../utils/handleToken";

// Styled components for enhanced look
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[4],
  },
}));

const OrderStatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "uppercase",
}));

const MyAccountOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || "orders"
  );
  const [orders, setOrders] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const token = getTokenFromCookie();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogout = () => {
  
    // Delete the token cookie
    deleteTokenCookie();
  
    // Reload the page to ensure the state is fully reset
    window.location.reload();
  
    // Use setTimeout to delay the navigation
    setTimeout(() => {
      navigate("/MyAccountSignIn");
    }, 1000); // Delay for 1 second (1000 milliseconds)
  };
  
  

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutClose = () => {
    setOpenLogoutDialog(false);
  };

  const handleDetailClick = (id) => {
    navigate(`/OrderDetailsView/${id}`);
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/order/getOrderByUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrders = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minHeight: "100vh" }}>
      {orders.length === 0 ? (
        <Typography variant="body1" align="center">
          No orders found
        </Typography>
      ) : (
        orders.map((order) => (
          <StyledCard key={order._id} variant="outlined">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    ORDER ID: {order._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} textAlign="center">
                  <OrderStatusChip
                    label={order.status}
                    color={order.status === "Delivered" ? "success" : "warning"}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4} textAlign="right">
                  <Typography variant="subtitle1" fontWeight="bold">
                    ₹{order.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.items.length} Items
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleDetailClick(order._id)}
                  >
                    View Details
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        ))
      )}
    </Box>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return renderOrders();
      case "settings":
        return <MyAcconutSetting />;
      case "address":
        return <MyAccountAddress />;
      default:
        return null;
    }
  };

  const sidebarContent = (
    <List sx={{ mr: 3 }}>
      {[
        { label: "Orders", icon: <ShoppingBagIcon />, value: "orders" },
        { label: "Settings", icon: <SettingsIcon />, value: "settings" },
        { label: "Address", icon: <LocationOnIcon />, value: "address" },
      ].map((item) => (
        <ListItem
          key={item.value}
          button
          selected={activeSection === item.value}
          onClick={() => {
            setActiveSection(item.value);
            handleDrawerToggle();
          }}
          sx={{
            backgroundColor:
              activeSection === item.value ? "lightgray" : "transparent",
            "&:hover": {
              backgroundColor:
                activeSection === item.value
                  ? "lightgray"
                  : "rgba(0, 0, 0, 0.08)",
            },
            borderRadius: "45px",
            my: 1,
          }}
        >
          <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
      <ListItem button onClick={handleLogoutClick}>
        <ListItemIcon sx={{ color: "black" }}>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Account
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: { xs: "none", sm: "block" },
              borderRight: "3px solid black",
              color: "black",
            }}
          >
            {sidebarContent}
          </Grid>

          <Grid item xs={12} sm={9}>
            {renderContent()}
          </Grid>
        </Grid>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Dialog open={openLogoutDialog} onClose={handleLogoutClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyAccountOrder;