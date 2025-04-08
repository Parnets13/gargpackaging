// Set the vendor token in a cookie
export const setVenderTokenInCookie = (token) => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString(); // 24 hours expiration
    document.cookie = `venderToken=${token}; path=/; expires=${expires}; SameSite=Lax`; // Removed Secure flag for development
    console.log("Token set in cookie:", token.substring(0, 20) + "...");
  };
  
  // Get the vendor token from cookies
  export const getVenderTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split("=");
      if (name === "venderToken") {
        return value;
      }
    }
    // Fallback to localStorage if cookie is not found
    const tokenFromsessionStorage = localStorage.getItem("venderToken");
    return tokenFromsessionStorage || null;
  };
  
  // Delete the vendor token cookie (e.g., for logout)
  export const deleteVenderTokenCookie = () => {
    document.cookie = "venderToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    localStorage.removeItem("venderToken");
    console.log("Vendor token deleted");
  };