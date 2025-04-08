import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Configure axios defaults for admin requests
const adminApi = axios.create({
  baseURL: 'http://localhost:3003/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to add token to all requests
adminApi.interceptors.request.use((config) => {
  const token = getAdminTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const validateAdminToken = async () => {
  const token = getAdminTokenFromCookie();
  if (!token) return false;

  try {
    // First validate token structure and expiration
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    if (decoded.exp < currentTime) {
      clearAdminSession();
      return false;
    }

    // Verify with backend
    const response = await adminApi.get('/auth/isAdmin');
    return response.data.isAdmin === true;
  } catch (error) {
    console.error("Admin token validation failed:", error);
    if (error.response?.status === 401) {
      clearAdminSession();
    }
    return false;
  }
};

export const clearAdminSession = () => {
  document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminInfo");
};

export const setAdminSession = (token, userData) => {
  // Set token with proper encoding
  const encodedToken = encodeURIComponent(token);
  document.cookie = `adminToken=${encodedToken}; path=/; secure`;
  localStorage.setItem("adminToken", token);
  
  if (userData) {
    localStorage.setItem("adminInfo", JSON.stringify(userData));
  }
};

export const getAdminTokenFromCookie = () => {
  const cookies = document.cookie.split(';');
  const adminTokenCookie = cookies.find(cookie => cookie.trim().startsWith('adminToken='));
  if (adminTokenCookie) {
    const token = adminTokenCookie.split('=')[1];
    return decodeURIComponent(token);
  }
  return null;
}; 