// utils/handleToken.js
const setTokenInCookie = (res, token) => {
    res.cookie("token", token, {
      httpOnly: true,   // Cookie is not accessible via JavaScript
      secure: true,     // Only sent over HTTPS
      sameSite: "Strict", // Prevents cross-site request forgery
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    });
  };
  
  module.exports = { setTokenInCookie };
  