import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "./AuthServices"; // Import your authentication service

const MyAccountSignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.group('📝 Signup Form Submission');
    console.log('Form data:', formData);

    try {
      const response = await AuthServices.signup(formData);
      console.log('Signup successful:', {
        status: response.status,
        message: response.data.message,
        data: response.data
      });

      if (response.status === 201) {
        console.log('✅ Navigating to OTP verification');
        console.log('Email for verification:', formData.email);
        navigate("/verify-otp", { state: { email: formData.email } });
      } else {
        console.warn('⚠️ Unexpected response:', response);
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.group('❌ Signup Error Handling');
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.groupEnd();

      if (error.response) {
        setError(error.response.data.message || "An error occurred");
      } else if (error.request) {
        setError("Network error. Please check your connection");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
      console.groupEnd();
    }
  };

  return (
    <div>
      <section className="my-lg-14 my-8">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
              <img
                src="/img/signup-g.svg"
                alt="basavacart"
                className="img-fluid"
              />
            </div>
            <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
              <div className="mb-lg-9 mb-5">
                <h1 className="mb-1 h2 fw-bold">Get Started Shopping</h1>
                <p>Welcome to Basavamart! Enter your details to get started.</p>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <small className="text-muted">
                      Password must contain at least one uppercase letter, one
                      number, one special character, and be at least 8 characters
                      long.
                    </small>
                  </div>
                  <div className="col-12 d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Signing up..." : "Register"}
                    </button>
                    <span className="navbar-text">
                      Already have an account?{" "}
                      <Link to="/MyAccountSignIn">Sign in</Link>
                    </span>
                  </div>
                  <p>
                    <small>
                      By continuing, you agree to our{" "}
                      <Link to="#!">Terms of Service</Link> &amp;{" "}
                      <Link to="#!">Privacy Policy</Link>
                    </small>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyAccountSignUp;