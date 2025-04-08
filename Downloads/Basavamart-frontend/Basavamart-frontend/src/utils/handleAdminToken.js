// Set the admin token in a cookie
export const setAdminTokenInCookie = (token) => {
  document.cookie = `adminToken=${token}; path=/`;
};

// Get the admin token from cookies
export const getAdminTokenFromCookie = () => {
  const cookies = document.cookie.split(';');
  const adminTokenCookie = cookies.find(cookie => cookie.trim().startsWith('adminToken='));
  if (adminTokenCookie) {
    const token = adminTokenCookie.split('=')[1];
    return decodeURIComponent(token);
  }
  return null;
};

// Delete the admin token cookie (e.g., for logout)
export const deleteAdminTokenCookie = () => {
  document.cookie = "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminInfo");
};