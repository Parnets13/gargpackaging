import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div
      className=" px-6 mt-3 py-6 sm:px-20 md:px-24 lg:px-16 xl:px-20"
      style={{ backgroundColor: "#45595b" }}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-y-8 lg:grid-cols-4">
        <div>
          <h3 className="footer-head lg:w-40 xl:w-auto">Why People Like us!</h3>
          <p className="footer-contact mt-4 md:w-60 lg:w-44 xl:w-56">
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the like Aldus PageMaker including of Lorem Ipsum.
          </p>
        </div>
        <div>
          <h3 className="footer-head">Shop Info</h3>
          <ul className="mt-5 ">
            <a href="/about">
              <li className="footer-body">About Us</li>
            </a>
            <a href="/about">
              <li className="footer-body">Contact Us</li>
            </a>
            <a href="/terms">
              <li className="footer-body">Privacy Policy</li>
            </a>
            <a href="/terms">
              <li className="footer-body">Terms & Condition</li>
            </a>
            <a href="/return">
              <li className="footer-body">Return Policy</li>
            </a>
            <a href="/return">
              <li className="footer-body">FAQs & Help</li>
            </a>
          </ul>
        </div>
        <div>
          <h3 className="footer-head">Account</h3>
          <ul className="mt-5">
            <a href="/MyAccountOrder">
              <li className="footer-body">My Account</li>
            </a>
            <a href="/cart">
              <li className="footer-body">Shopping Cart</li>
            </a>
            <a href="/MyAccountOrder">
              <li className="footer-body">Order History</li>
            </a>
          </ul>
        </div>
        <div>
          <h3 className="footer-head">Contact</h3>
          <div className="mt-5">
            <p className="footer-contact">
              Address: <br />BASAVA MART <br />
              C-79,3rd Stage, Thigalarapalya Road <br />
              Peenya Industrial Area Bangalore <br />560058
            </p>
            <p className="footer-contact">Email: Example@gmail.com</p>
            <p className="footer-contact">Phone: +91 98441 92551</p>
            {/* <p className="footer-contact">Payment Accepted</p>
            <img className="mt-4" src="../img/payment.png" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
