import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getAdminTokenFromCookie } from "../../utils/handleAdminToken";
import Header from "../common/header/Header";
import Home from "../Home";
import Footer from "../common/footer/Footer";
import Shop from "../Shop";
import ShopDetail from "../ShopDetail";
import Testimonial from "../testimonial/Testimonial";
import TestimonialMain from "../testimonial/TestimonialMain";
import Error from "../Error";
import Contact from "../Contact";
import Cart from "../Cart";
import Checkout from "../Checkout";
import MyAccountSignIn from "../../data/Accounts/MyAccountSignIn";
import FloatingActions from "../FloatingActions";
import MyAccountOrder from "../../data/Accounts/MyAccountOrder";
import OrderDetailsView from "../../data/Accounts/OrderDetailsView";
import Main from "../admin/Main";
import AboutUs from "../AboutUs";
import Terms from "../Terms";
import Return from "../Return";
import AdminLogin from "../admin/AdminLogin";
import OTPVerification from "../OTPVerification";
import AllBrands from "../AllBrands";
import MyAccountSignUp from "../../data/Accounts/MyAccountSignUp";
import VenderMain from "../admin/VenderMain";
import VenderLogin from "../admin/VenderLogin";
import VenderProtecedRoute from "../admin/VenderProtectedRoute";
import MyAccountSetting from "../../data/Accounts/MyAcconutSetting";

// Create AdminProtectedRoute component inline
const AdminProtectedRoute = ({ children }) => {
  const adminToken = getAdminTokenFromCookie();
  console.log("AdminProtectedRoute - checking token:", !!adminToken);
  
  if (!adminToken) {
    console.log("No admin token found");
    return <Navigate to="/admin-login" />;
  }

  try {
    const decoded = jwtDecode(adminToken);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      console.log("Admin token expired");
      return <Navigate to="/admin-login" />;
    }

    return children;
  } catch (error) {
    console.error("Error validating admin token:", error);
    return <Navigate to="/admin-login" />;
  }
};

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const Pages = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <Main />
              </AdminProtectedRoute>
            }
          />

          {/* Vendor Routes */}
          <Route path="/vender-login" element={<VenderLogin />} />
          <Route
            path="/vender/*"
            element={
              <VenderProtecedRoute>
                <VenderMain />
              </VenderProtecedRoute>
            }
          />

          {/* Public Routes */}
          <Route
            path="/MyAccountSignin"
            element={
              <Layout>
                <MyAccountSignIn />
              </Layout>
            }
          />
          <Route path="/signup" element={<Layout><MyAccountSignUp /></Layout>} />

          <Route
            path="/about"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />
          <Route
            path="/terms"
            element={
              <Layout>
                <Terms />
              </Layout>
            }
          />
          <Route
            path="/return"
            element={
              <Layout>
                <Return />
              </Layout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/shop"
            element={
              <Layout>
                <Shop />
              </Layout>
            }
          />
          <Route
            path="/shop-detail/:id"
            element={
              <Layout>
                <ShopDetail />
              </Layout>
            }
          />
          <Route
            path="/testimonial"
            element={
              <Layout>
                <TestimonialMain />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />
          <Route
            path="/error"
            element={
              <Layout>
                <Error />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/OrderDetailsView/:id"
            element={
              <Layout>
                <OrderDetailsView />
              </Layout>
            }
          />
          <Route
            path="/MyAccountSetting"
            element={
              <Layout>
                <MyAccountSetting/>
              </Layout>
            }
          />
          <Route
            path="/MyAccountOrder"
            element={
              <Layout>
                <MyAccountOrder />
              </Layout>
            }
          />
          {/* OTP Verification Route */}
          <Route
            path="/verify-otp"
            element={
              <Layout>
                <OTPVerification />
              </Layout>
            }
          />
          {/* All Brands Route */}
          <Route
            path="/all-brands"
            element={
              <Layout>
                <AllBrands />
              </Layout>
            }
          />
        </Routes>
        <FloatingActions />
      </Router>
    </>
  );
};

export default Pages;