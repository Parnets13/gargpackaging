const nodemailer = require('nodemailer');
const generateOTP = require('../utils/generateOTP'); // Ensure you have this utility function

// Set up your email service (Nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services like Outlook, Yahoo, etc.
  auth: {
    user: 'your-email@gmail.com', // Your email address
    pass: 'your-email-password', // Use App Password if 2FA is enabled
  },
});

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'your-email@gmail.com', // Sender email address
    to: email, // Recipient email address
    subject: 'Your OTP Code', // Email subject
    text: `Your OTP code is ${otp}. This code will expire in 10 minutes.`, // Email body
  };

  try {
    await transporter.sendMail(mailOptions); // Send the email
    console.log('OTP sent to:', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

// Function to handle OTP sending
const sendOtp = async (req, res) => {
  const { email } = req.body; // Extract user email from the request body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = generateOTP(); // Generate OTP using your utility function

  try {
    // Send OTP via email
    await sendOtpEmail(email, otp);

    // Return success response
    res.status(200).json({ message: 'OTP sent successfully', otp }); // For testing, you can return the OTP
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

module.exports = { sendOtp };