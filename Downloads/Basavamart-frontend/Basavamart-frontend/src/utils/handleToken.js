// Set the token in a cookie
export const setTokenCookie = (token) => {
  console.group('🍪 Setting Token Cookie');
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1); // 1 day expiry
    document.cookie = `user_token=${token}; path=/; expires=${expiryDate.toUTCString()}`;
    console.log('✅ Token cookie set successfully');
  } catch (error) {
    console.error('❌ Error setting token cookie:', error);
  }
  console.groupEnd();
};

// Get the token from cookies
export const getTokenFromCookie = () => {
  console.group('🔍 Getting Token from Cookie');
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('user_token='));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;
    console.log('Token found:', !!token);
    console.groupEnd();
    return token;
  } catch (error) {
    console.error('❌ Error getting token:', error);
    console.groupEnd();
    return null;
  }
};

// Delete the token cookie (e.g., for logout)
export const deleteTokenCookie = () => {
  console.group('🗑️ Deleting Token Cookie');
  try {
    document.cookie = "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log('✅ Token cookie deleted');
  } catch (error) {
    console.error('❌ Error deleting token:', error);
  }
  console.groupEnd();
};