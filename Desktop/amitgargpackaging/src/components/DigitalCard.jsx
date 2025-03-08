import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function DigitalCard() {
  return (
    <div className="container mt-5">
      <div className="card text-center p-4" style={{ maxWidth: "400px", margin: "auto" }}>
        <img
          src="https://via.placeholder.com/150"
          className="rounded-circle mx-auto mb-3"
          style={{ width: "150px", height: "150px" }}
          alt="Profile"
        />
        <h3 className="card-title">Sumeet Garg</h3>
        <p className="text-muted mb-1">CEO, Garg Packaging Traders LLP</p>
        <p className="text-muted">Gurgaon, Bangalore | (+91) 8588065330</p>

        <a href="mailto:gargtraders@gmail.com" className="btn btn-primary mt-3">
          Email Me
        </a>

        <hr className="my-4" />
        <h5>Connect on Socials</h5>
        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="text-primary">
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a href="#" className="text-info">
            <i className="bi bi-twitter fs-4"></i>
          </a>
          <a href="#" className="text-danger">
            <i className="bi bi-instagram fs-4"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DigitalCard;
