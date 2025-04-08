import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) {
    console.log("No token provided to check expiration");
    return true;
  }
  
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("Current time:", currentTime, "Token expiration:", decoded.exp);
    
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

