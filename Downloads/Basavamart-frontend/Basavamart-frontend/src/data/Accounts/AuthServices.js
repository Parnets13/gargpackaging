import axios from "axios"
import { toast } from "react-toastify"
import { setTokenCookie } from '../../utils/handleToken'

const API_URL = "http://localhost:3003/api/auth"

// Login user
const login = async (userData) => {
  try {
    console.group('🔐 Login Attempt');
    console.log('Login request data:', userData);
    
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log('Login response:', response);

    if (response.data.token) {
      console.log('🎯 Storing credentials...');
      
      const token = response.data.token;
      const userInfo = response.data.user;

      // Store token in both localStorage and cookie
      localStorage.setItem("user_token", token);
      setTokenCookie(token);
      
      // Store user info
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Dispatch login event with user info
      window.dispatchEvent(new CustomEvent('user-login', { 
        detail: { token, userInfo } 
      }));
      
      console.log('✅ Login successful');
      console.log('Token stored:', token);
      console.log('User info stored:', userInfo);
    }
    
    console.groupEnd();
    return response;
  } catch (error) {
    console.group('❌ Login Error');
    console.error('Error details:', error);
    console.groupEnd();
    throw error;
  }
}

// Signup user
const signup = async (userData) => {
  try {
    console.group('📝 Signup Attempt');
    console.log('Signup request data:', userData);
    
    localStorage.setItem("temp_password", userData.password);
    console.log('Temporary password stored for auto-login');
    
    const response = await axios.post(`${API_URL}/signup`, userData);
    console.log('Signup response:', {
      status: response.status,
      data: response.data,
      message: response.data.message
    });
    console.groupEnd();
    return response;
  } catch (error) {
    console.group('❌ Signup Error');
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    console.groupEnd();
    throw error;
  }
}

// Verify OTP
const verifyOTP = async (otpData) => {
  try {
    console.group('🔑 OTP Verification Attempt');
    console.log('OTP verification request data:', otpData);
    
    const response = await axios.post(`${API_URL}/verify-otp`, otpData);
    console.log('OTP verification response:', response);

    if (response.data.token) {
      console.log('🎯 Token received after OTP verification');
      
      const token = response.data.token;
      const userInfo = response.data.user;
      
      // Store token in both localStorage and cookie
      localStorage.setItem("user_token", token);
      setTokenCookie(token);
      
      // Store user info
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      
      console.log('✅ Credentials stored after verification');

      // Try auto-login
      const storedPassword = localStorage.getItem("temp_password");
      if (storedPassword) {
        console.log('Attempting auto-login after verification');
        await login({ email: otpData.email, password: storedPassword });
        localStorage.removeItem("temp_password");
      }
    }
    
    console.groupEnd();
    return response;
  } catch (error) {
    console.group('❌ OTP Verification Error');
    console.error('Error details:', error);
    console.groupEnd();
    throw error;
  }
}

// Login with OTP
const loginWithOTP = (loginData) => {
  return axios.post(`${API_URL}/login-otp`, loginData).then((response) => {
    if (response.data.token) {
      setToken(response.data.token)
    }
    return response
  })
}

// Request OTP
const requestOTP = (email, password) => {
  return axios.post(`${API_URL}/request-otp`, { email, password })
}

// Handle token storage
const setToken = (token) => {
  if (token) {
    localStorage.setItem("user_token", token)
    console.log("Token set in localStorage:", token)
  } else {
    localStorage.removeItem("user_token")
  }
}

// Get current token
const getToken = () => {
  return localStorage.getItem("user_token")
}

// Get current user
const getCurrentUser = () => {
  const token = getToken()
  return token ? { token } : null
}

// Add axios interceptor to include token in requests
axios.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Logout user
const logout = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("temp_password");
  document.cookie = "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export default {
  login,
  signup,
  verifyOTP,
  loginWithOTP,
  requestOTP,
  getCurrentUser,
  setToken,
  getToken,
  logout
}

