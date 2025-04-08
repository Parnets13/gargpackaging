import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthServices from '../data/Accounts/AuthServices';
import { toast } from 'react-toastify';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/MyAccountSignIn');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple verification attempts
    if (verificationAttempted || loading) {
      return;
    }

    setLoading(true);
    setError('');
    setVerificationAttempted(true);

    try {
      const trimmedOTP = otp.trim();
      console.log('Submitting OTP verification:', { email, otp: trimmedOTP });

      const response = await AuthServices.verifyOTP({
        email,
        otp: trimmedOTP
      });

      console.log('Verification response:', response);

      if (response.data.token) {
        toast.success("Email verified successfully!");
        
        // Try to log in automatically using stored credentials
        try {
          const storedPassword = localStorage.getItem("temp_password");
          if (storedPassword) {
            await AuthServices.login({ email, password: storedPassword });
            localStorage.removeItem("temp_password"); // Clear stored password
          }
        } catch (loginError) {
          console.error("Auto-login failed:", loginError);
          // Redirect to login page if auto-login fails
          navigate('/MyAccountSignIn');
          return;
        }
        
        navigate('/');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      setVerificationAttempted(false); // Allow retry on error
      
      if (error.response) {
        const errorMessage = error.response.data.message || "Invalid OTP";
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError("Network error. Please try again");
        toast.error("Network error. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Verify Your Email</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    disabled={loading}
                  />
                  <small className="text-muted">
                    Please enter the OTP sent to your email
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading || verificationAttempted}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;