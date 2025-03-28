const express = require('express');
const { sendOtp } = require('../controllers/otpController');  // Import the OTP controller
const router = express.Router();

// Define a POST route for sending OTP
router.post('/send-otp', sendOtp);

module.exports = router;
