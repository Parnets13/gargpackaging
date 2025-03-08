import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../assests/garg/logo_garg-removebg-preview.png';
import "../css/Navbar.css"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid">
          {/* Logo on Left */}
          <div className="navbar-brand">
            <img src={logo} alt="Logo" className="img-fluid" style={{width: '70%'}} />
          </div>

          {/* Contact Info on Top Right */}
          <div className="d-none d-lg-flex position-absolute top-0 end-0 mt-2 me-4 px-2">
            <div className="d-flex align-items-center me-5">
              <i className="bi bi-telephone-fill me-2 shake-animation" style={{color:'#976314'}}></i>
              <a style={{color:'black'}} href="tel:+919876543210" className=" text-decoration-none">
                +91 9215881328
              </a>
            </div>
            <div className="d-flex align-items-center me-5">
              <i className="bi bi-envelope-fill me-2" style={{color:'#976314'}}></i>
              <a style={{color:"black"}} href="mailto:info.gargpackaging@gmail.com" className=" text-decoration-none">
                info.gargpackaging@gmail.com
              </a>
            </div>
          </div>

          {/* Mobile Toggle (Shaking Animation) */}
          <button 
            className="navbar-toggler"
            type="button"   
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon">
            <i className="fas fa-bars"></i>
            </span>
          </button>

          {/* Navigation Links */}
          <div className={`navbar-collapse ${isOpen ? 'show' : 'collapse'}`}>
            <ul className="navbar-nav ms-auto me-5 ">
              <li className="nav-item mx-2">
                <Link to="/" className="nav-link custom-nav-link"  style={{color:'white',backgroundColor:'#D4AF37'}}>Home</Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/AboutUs" className="nav-link custom-nav-link"  style={{color:'white',backgroundColor:'#D4AF37'}}>About Us</Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/capability" className="nav-link custom-nav-link"  style={{color:'white',backgroundColor:'#D4AF37'}}>Products</Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/contact" className="nav-link custom-nav-link"  style={{color:'white  ',backgroundColor:'#D4AF37'}}>Contact Us</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>

    
    </>
  );
};

export default Navbar;
