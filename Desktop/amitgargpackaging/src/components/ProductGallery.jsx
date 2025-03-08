import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ProductGallery.css";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import service from "../assests/service-01.jpg";
import service1 from "../assests/service-02.jpg";
import service2 from "../assests/service-03.jpg";
import service3 from "../assests/service-04.png";
import service4 from "../assests/service-05.png";
import service5 from "../assests/service-06.webp";
import { Link } from "react-router-dom";
import GalleryData from "./GalleryData";
import logo from './../assests/WhatsApp_Image_2024-12-10_at_2.21.55_PM-removebg-preview.png';




// Updated array to handle both images and videos (total 15 media items)
const media = [
  { type: "image", src: service },
  { type: "image", src: service1 },
  { type: "image", src: service2 },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { type: "image", src: service3 },
  { type: "video", src: service5 },
  { type: "image", src: service4 },
  { type: "image", src: "https://via.placeholder.com/300" },
  { type: "image", src: "https://via.placeholder.com/300" },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { type: "image", src: "https://via.placeholder.com/300" },
  { type: "image", src: "https://via.placeholder.com/300" },
  { type: "video", src: "https://www.w3schools.com/html/movie.mp4" },
  { type: "image", src: "https://via.placeholder.com/300" },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

function ProductGallery() {
  return (
    <div className="containerx">
      {" "}
      {/* Added margin from navbar */}
      <div className="row">
        <div className="about-page">
          {/* Navbar */}

          {/* Content below Navbar */}
          <div className="gallery-page ">
            <div className="overlay"></div>

            <div className="content-wrapper1">
              <h1>Product Gallery</h1>
              {/* <div className="breadcrumb1">
            <i className="fa-solid fa-house-chimney"></i>
            <Link><span className="me-3">Home </span></Link>
            <i className="fa-regular fa-address-card"></i>
            <span>About Us</span>
          </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="px-5">
        <div className="row mt-5 ">
          {media.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                className="img-container"
                style={{ width: "100%", height: "300px", overflow: "hidden" }}
              >
                {" "}
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`Product ${index}`}
                    className="img-fluid product-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                ) : (
                  <video
                    controls
                    className="img-fluid product-video"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  >
                    <source src={item.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <Container className="mt-5">
        {GalleryData.map((gallery, galleryIndex) => (
          <div key={galleryIndex}>
            <h2 className="mt-5">{gallery.title}</h2>
            <Row>
              {gallery.images.map((image, imageIndex) => (
                <Col
                  key={imageIndex}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Image
                    src={image}
                    alt={`Image ${imageIndex + 1}`}
                    className=" product-img"
                  />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
      <div>
        <footer
          className="pt-5"
          style={{ backgroundColor: "#2C3E50", color: "white" }}
        >
          <Container>
            {/* Main Footer Content */}
            <Row>
              {/* Company Logo and Info */}
              <Col md={3} className="mb-4">
                <div className="mb-3">
                  <img
                    src={logo}
                    alt="Machinerex"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <p>
                  Founded by engineers with over two decades of expertise in
                  manufacturing and supply chain management, PreciseAxis Pvt Ltd
                  is a trusted name in engineering excellence
                </p>
                <div>{/* <h6>Customer Service</h6> */}</div>
              </Col>

              {/* Quick Links */}
              <Col md={3} className="mb-4">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/" className="text-white">
                      <i class="bi bi-chevron-right"></i>Home
                    </a>
                  </li>
                  <li>
                    <a href="/AboutUs" className="text-white">
                      <i class="bi bi-chevron-right"></i>About Us
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Capabilities
                    </a>
                  </li>
                  <li>
                    <a href="/equipment" className="text-white">
                      <i class="bi bi-chevron-right"></i>Product Gallery
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-white">
                      <i class="bi bi-chevron-right"></i>Contact Us
                    </a>
                  </li>
                </ul>
              </Col>

              {/* Our Service */}
              <Col md={3} className="mb-4">
                <h5>Our Capabilities</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white">
                      <i class="bi bi-chevron-right"></i>Casting
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      <i class="bi bi-chevron-right"></i>Injection Molding
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      <i class="bi bi-chevron-right"></i>CNC Machining Available
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      <i class="bi bi-chevron-right"></i>High-Quality Equipment
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      <i class="bi bi-chevron-right"></i>Heavy Engineering
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      <i class="bi bi-chevron-right"></i>Stamping
                    </a>
                  </li>
                </ul>
              </Col>

              {/* Get in Touch */}
              <Col md={4} className="mb-4">
                  <h5>Get in Touch</h5>
                  <p>
                    <i
                      className="bi bi-geo-alt-fill"
                      style={{ color: "#F39C12" }}
                    ></i>
                    <span className="fw-bold" style={{ color: "#F39C12" }}>
                      {" "}
                      <Link
                                              style={{ color: "#F39C12" }}

                        to="https://www.google.com/maps/place/13%C2%B001'25.7%22N+77%C2%B032'10.5%22E/@13.024074,77.532818,15z/data=!4m4!3m3!8m2!3d13.0238056!4d77.53625?hl=en&entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D"
                        target="blank"
                      >
                        Bangalore Office :{" "}
                      </Link>
                    </span>
                    C-06 and C-07 , 4th Main Road, Opp ESI Office , Industrial
                    Sub 2nd Stage, Yeshwanthpur, Bangalore - 560022,
                    State: Karnataka Amit – 9215881328
                  </p>
                  <p style={{ fontSize: "15px" }}>
                    <span className="fw-bold" style={{ color: "#F39C12" }}>
                      {" "}
                      <i
                        className="bi bi-geo-alt-fill"
                        style={{ color: "#F39C12" }}
                      ></i>{" "}
                      <Link
                                              style={{ color: "#F39C12" }}

                        to="https://www.google.com/maps/place/Garg+Packing+Traders+-+Thermocol+Sheets,+Corrugated+Roll/@28.514784,77.076918,14z/data=!4m6!3m5!1s0x390d1960fc73d21b:0xa8ea640908e75852!8m2!3d28.5147841!4d77.0769177!16s%2Fg%2F1ptx5xz5j?hl=en&entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D"
                        target="blank"
                      >
                        Gurgaon Office :{" "}
                      </Link>
                    </span>
                    Plot No. 115, Basement, Opp. Sheetal Medical Store,
                    Dundahera, Gurgaon - 122016 GSTIN: 06ALFPG0402L1ZK State:
                    Haryana Contact: Sumeet Garg – 8588065330
                  </p>

                  <p className="d-flex align-items-center gap-2">
                    <i
                      className="bi bi-envelope-fill"
                      style={{ color: "#F39C12" }}
                    ></i>{" "}
                   <a href="mailto:info.gargpackaging@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>
    info.gargpackaging@gmail.com
  </a> 
                  </p>
                  <p className="d-flex align-items-center gap-2">
                    <i
                      className="bi bi-telephone-fill"
                      style={{ color: "#F39C12" }}
                    ></i>{" "}
                    (+91) 9215881328 / 8588065330
                  </p>
                  {/* <input className="p-1 w-90" type="text" placeholder="Email" /> <Button className="p-2" style={{backgroundColor:'#976314',color:'white'}} type="submit">Submit</Button> */}
                </Col>
            </Row>

            {/* Footer Bottom */}
            <Row className="pt-3 border-top" style={{ borderColor: "#F39C12" }}>
              <Col md={6}>
                <p className="mb-0">Privacy Policy | Terms & Service</p>
              </Col>
              <Col md={6} className="text-md-end">
                <p className="mb-0">
                  &copy; 2024 All Rights Reserved | Design by <Link to="https://parnetsgroup.com/" target="blank"> ParNets</Link>
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </div>
  );
}

export default ProductGallery;
