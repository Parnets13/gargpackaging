// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Collapse,
//   IconButton,
//   Container,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { Menu as MenuIcon, ExpandLess, ExpandMore } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// // Import your page components
// import Users from "./Users";
// import Products from "./Products";
// import Enquiries from "./Enquiries";
// import Orders from "./Orders";
// import UserEnquiry from "./UserEnquiry";
// import AddProduct from "./AddProduct";
// import ProductList from "./ProductList";
// import Testimonials from "./Testimonials"

// const AdminHeader = () => {
//   const [activePage, setActivePage] = useState("Users");
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isProductsOpen, setIsProductsOpen] = useState(false);
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

//   const handlePageClick = (page) => {
//     setActivePage(page);
//     if (isMobile) setIsDrawerOpen(false);

//     // Close products dropdown if not a products-related page
//     if (
//       !["Add Products", "Product List", "Brands and Category"].includes(page)
//     ) {
//       setIsProductsOpen(false);
//     }
//   };

//   const renderActivePage = () => {
//     const pageMap = {
//       Users: <Users />,
//       "Brands and Category": <Products />,
//       Enquiries: <Enquiries />,
//       Orders: <Orders />,
//       "Member Requests": <UserEnquiry />,
//       "Add Products": <AddProduct />,
//       "Product List": <ProductList />,
//       "Testimonials": <Testimonials />,
//     };
//     return pageMap[activePage] || <Users />;
//   };

//   const SidebarContent = () => (
//     <Box sx={{ width: 240, height: "100%", pt: 10 }}>
//       <List>
//         {[
//           { label: "Users", value: "Users" },
//           { label: "Brands and Category", value: "Brands and Category" },
//           { label: "Enquiries", value: "Enquiries" },
//           { label: "Orders", value: "Orders" },
//           { label: "Member Requests", value: "Member Requests" },
//           {
//             label: "Products",
//             value: "Products",
//             children: [
//               { label: "Add Products", value: "Add Products" },
//               { label: "Product List", value: "Product List" },
//             ],
//           },
//           {
//             label: "Testimonials",
//             value: "Testimonials",
//           },
//         ].map((item) => (
//           <React.Fragment key={item.value}>
//             <ListItem
//               disablePadding
//               sx={{
//                 borderBottom: "1px solid #e0e0e0",
//                 "&:last-child": { borderBottom: "none" },
//               }}
//             >
//               {item.children ? (
//                 <ListItemButton
//                   onClick={() => setIsProductsOpen(!isProductsOpen)}
//                   selected={activePage === item.value}
//                   sx={{
//                     backgroundColor:
//                       activePage === item.value
//                         ? "rgba(0, 0, 0, 0.08)"
//                         : "transparent",
//                     "&.Mui-selected:hover": {
//                       backgroundColor: "rgba(0, 0, 0, 0.12)",
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     primary={item.label}
//                     sx={{ color: "#E55814" }}
//                   />
//                   {isProductsOpen ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>
//               ) : (
//                 <ListItemButton
//                   onClick={() => handlePageClick(item.value)}
//                   selected={activePage === item.value}
//                   sx={{
//                     backgroundColor:
//                       activePage === item.value
//                         ? "rgba(0, 0, 0, 0.08)"
//                         : "transparent",
//                     "&.Mui-selected:hover": {
//                       backgroundColor: "rgba(0, 0, 0, 0.12)",
//                     },
//                   }}
//                 >
//                   <ListItemText
//                     sx={{ color: "#E55814" }}
//                     primary={item.label}
//                   />
//                 </ListItemButton>
//               )}
//             </ListItem>

//             {item.children && (
//               <Collapse in={isProductsOpen} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {item.children.map((child) => (
//                     <ListItem key={child.value} disablePadding sx={{ pl: 2 }}>
//                       <ListItemButton
//                         onClick={() => handlePageClick(child.value)}
//                         selected={activePage === child.value}
//                         sx={{
//                           backgroundColor:
//                             activePage === child.value
//                               ? "rgba(0, 0, 0, 0.08)"
//                               : "transparent",
//                           "&.Mui-selected:hover": {
//                             backgroundColor: "rgba(0, 0, 0, 0.12)",
//                           },
//                         }}
//                       >
//                         <ListItemText sx={{}} primary={child.label} />
//                       </ListItemButton>
//                     </ListItem>
//                   ))}
//                 </List>
//               </Collapse>
//             )}
//           </React.Fragment>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       {/* App Bar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           backgroundColor: "white",
//           color: "black",
//           boxShadow: "none",
//           borderBottom: "1px solid #e0e0e0",
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar sx={{ justifyContent: "space-between" }}>
//             <Box
//               sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
//               onClick={() => navigate("/")}
//             >
//               <img
//                 src="../img/logo1.png"
//                 alt="logo"
//                 style={{ height: "75px", width: "120px" }}
//               />
//             </Box>
//             <Typography
//               variant="h6"
//               sx={{
//                 flexGrow: 1,
//                 textAlign: "center",
//                 fontWeight: 600,
//               }}
//             >
//               Admin Panel
//             </Typography>
//             {isMobile && (
//               <IconButton color="inherit" onClick={() => setIsDrawerOpen(true)}>
//                 <MenuIcon />
//               </IconButton>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Desktop Sidebar */}
//       {!isMobile && (
//         <Box
//           sx={{
//             width: 240,
//             flexShrink: 0,
//             height: "100%",
//             borderRight: "1px solid #e0e0e0",
//             color: "#E55814",
//           }}
//         >
//           <SidebarContent />
//         </Box>
//       )}

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="left"
//         open={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 240,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <SidebarContent />
//       </Drawer>

//       {/* Main Content Area */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           mt: "64px",
//           ml: { xs: 0 },
//           backgroundColor: "#f4f4f4",
//           height: "calc(100vh - 64px)",
//           overflowY: "auto",
//         }}
//       >
//         {renderActivePage()}
//       </Box>
//     </Box>
//   );
// };

// export default AdminHeader;

import React, { useState } from "react";
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
// import { Helmet } from "react-helmet";

// Import your page components
import Users from "./Users";
import Products from "./Products";
import Enquiries from "./Enquiries";
import Orders from "./Orders";
import UserEnquiry from "./UserEnquiry";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import Testimonials from "./Testimonials";
import Banner from "./Banner";
import { deleteTokenCookie } from "../../utils/handleToken"; // Adjust import path as needed
import { deleteAdminTokenCookie } from "../../utils/handleAdminToken";
import Cookies from "js-cookie";
import VenderUserData from "./VenderUserData";
import VendorProductList from "./VendorProductList";
const AdminHeader = () => {
  const [activePage, setActivePage] = useState("Users");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);      
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handlePageClick = (page) => {
    setActivePage(page);
    if (isMobile) setIsDrawerOpen(false);

    // Close products dropdown if not a products-related page
    if (
      !["Add Products", "Product List", "Brands and Category"].includes(page)
    ) {
      setIsProductsOpen(false);
    }
  };

  const handleLogout = () => {
    deleteAdminTokenCookie();
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    Cookies.remove("adminToken");
    setIsLogoutDialogOpen(false);
    navigate("/admin-login");
  };

  const renderActivePage = () => {
    const pageMap = {
      Users: <Users />,
    "Vender Users": <VenderUserData/>,
      "Brands and Category": <Products />,
      Enquiries: <Enquiries />,
      Orders: <Orders />,
      "Member Requests": <UserEnquiry />,
      "Add Products": <AddProduct />,
      "Product List": <ProductList />,
      "Vendor Product List": <VendorProductList/>,
      Testimonials: <Testimonials />,
      Banners: <Banner/>,
    };
    return pageMap[activePage] || <Users />;
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
          { label: "Users", value: "Users" },
          { label: "Vender Users", value: "vender Users" },
          { label: "Brands and Category", value: "Brands and Category" },
          { label: "Enquiries", value: "Enquiries" },
          { label: "Orders", value: "Orders" },
          { label: "Member Requests", value: "Member Requests" },
          {
            label: "Products",
            value: "Products",
            children: [
              { label: "Add Products", value: "Add Products" },
              { label: "Product List", value: "Product List" },
              { label: "Vendor Product List", value: "Vendor Product List" },     
            ],
          },
          {
            label: "Testimonials",
            value: "Testimonials",
          },
          {
            label: "Banners",
            value: "Banners",
          },
        ].map((item) => (
          <React.Fragment key={item.value}>
            <ListItem
              disablePadding
              sx={{
                borderBottom: "1px solid #e0e0e0",
                "&:last-child": { borderBottom: "none" },
              }}
            >
              {item.children ? (
                <ListItemButton
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
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
                  <ListItemText
                    primary={item.label}
                    sx={{ color: "#E55814" }}
                  />
                  {isProductsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              ) : (
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
                  <ListItemText
                    sx={{ color: "#E55814" }}
                    primary={item.label}
                  />
                </ListItemButton>
              )}
            </ListItem>

            {item.children && (
              <Collapse in={isProductsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.value} disablePadding sx={{ pl: 2 }}>
                      <ListItemButton
                        onClick={() => handlePageClick(child.value)}
                        selected={activePage === child.value}
                        sx={{
                          backgroundColor:
                            activePage === child.value
                              ? "rgba(0, 0, 0, 0.08)"
                              : "transparent",
                          "&.Mui-selected:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                          },
                        }}
                      >
                        <ListItemText sx={{}} primary={child.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
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
                Admin Panel
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
            Are you sure you want to log out of the admin panel?
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

export default AdminHeader;
