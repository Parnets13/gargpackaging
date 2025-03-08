import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import worker from "../assests/worker.webp";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assests/garg/logo_garg.jpeg";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function ContactUs() {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div>
        <div className="contact-page">
          <div className="overlay"></div>
          <div className="content-wrapper1">
            <h1 className="mt-5">Contact Us</h1>
          </div>
        </div>
      </div>
      <Container
        fluid
        className="p-5"
        style={{
          backgroundColor: "#2C3E50",
          color: "white",
          marginTop: "100px",
        }} // Add marginTop
      >
        <Row>
          {/* First Flexbox: Content */}
          <Col md={6}>
            <h2>We&apos;re Here to Help Contact Us</h2>
            <p>
              We are here to assist you! If you have any questions or need more
              information about our products and services, please feel free to
              reach out. Our team at Garg Packaging Traders LLP is ready to
              provide you with the details and support you need.
            </p>
            <h5 className="text-warning mb-3">Get In Touch</h5>
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p> */}

            {/* 2x2 Grid for Contact Info */}
            <Row className="mb-4">
              <Col
                md={6}
                className="mb-3"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <Card className="bg-dark text-white p-3">
                  <Card.Body className="d-flex align-items-start">
                    <div className="me-3">
                      <i
                        className="bi bi-telephone-fill"
                        style={{ fontSize: "1.5rem", color: "#F39C12" }}
                      ></i>
                    </div>
                    <div style={{textAlign:'justify'}}> 
                      <Card.Title >Call Now</Card.Title>
                      <Card.Text style={{textAlign:'justify'}}>(+91) 9215881328 / 8588065330 </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col
                md={6}
                className="mb-3"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <Card className="bg-dark text-white p-3">
                  <Card.Body className="d-flex align-items-start">
                    <div className="me-3" >
                      <i
                        className="bi bi-envelope-fill"
                        style={{ fontSize: "1.5rem", color: "#F39C12" }}
                      ></i>
                    </div>
                    <div style={{textAlign:'justify'}}>
                      <Card.Title>Email</Card.Title>
                      <Card.Text> info.gargpackaging@gmail.com</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {/* <Col md={6} className="mb-3">
                <Card className="bg-dark text-white p-3">
                  <Card.Body className="d-flex align-items-center">
                    <div className="me-3">
                      <i
                        className="bi bi-clock-fill"
                        style={{ fontSize: "1.5rem", color: "#F39C12" }}
                      ></i>
                    </div>
                    <div>
                      <Card.Title>Operational</Card.Title>
                      <Card.Text>09:00 AM - 05:00 PM</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col> */}
              <Col
                md={12}
                className="mb-3"
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
              >
                <Card className="bg-dark text-white p-3">
                  <Card.Body className="d-flex align-items-start">
                    <div className="me-3">
                      <i
                        className="bi bi-geo-alt-fill"
                        style={{ fontSize: "1.5rem", color: "#F39C12" }}
                      ></i>
                    </div>
                    <div style={{textAlign:'justify'}}>
                      <Card.Title>Location</Card.Title>
                      <Card.Text>
                        1) Bangalore Branch :
                        C-06 and C-07 , 4th Main Road , Opp ESI Office , Industrial Sub 2nd Stage, Yeshwanthpur, Bangalore - 560022 , 
                    {/* GSTIN: 29ABAFG1529P1Z1 */}
                  <p>State: Karnataka , Amit – 9215881328</p>  
                
                      </Card.Text>
                      <Card.Text>
                        2) Gurgaon Head Office: Plot No. 115, Basement, Opp.
                        Sheetal Medical Store, Dundahera, Gurgaon - 122016
                        GSTIN: 06ALFPG0402L1ZK State: Haryana
                        <p>Contact: M – 8588065330</p>
                      </Card.Text>
                   
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Second Flexbox: Image */}
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center mt-5 flex-column"
          >
            {/* <img
              src={worker}
              alt="Worker"
              style={{ maxWidth: "100%", height: "660px" }}
            /> */}
            {/* <Col md={10} lg={8}> */}
            <h2 className="mt-5">Bangalore Location</h2>
            <div style={{ width: "100%" }}>
              {" "}
              <iframe
                width="100%"
                height="250"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
             src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4622.664594097311!2d77.53281752690445!3d13.024073817220577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDAxJzI1LjciTiA3N8KwMzInMTAuNSJF!5e0!3m2!1sen!2sin!4v1738669889428!5m2!1sen!2sin"
                // https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=garg%20packaging%20traders+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed
                title="Garg Packaging Traders Location"
              >
                {" "}
                <a href="https://www.gps.ie/">gps tracker sport</a>{" "}
              </iframe>{" "}
            </div>
            <h2>Gurgaon Location</h2>
            <div style={{ width: "100%" }}>
              {" "}
              <iframe
                width="100%"
                height="250"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
             src=" https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=garg%20packaging%20traders+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            
                title="Garg Packaging Traders Location"
              >
                {" "}
                <a href="https://www.gps.ie/">gps tracker sport</a>{" "}
              </iframe>{" "}
            </div>
            {/* <div>
              <Form className="p-4 shadow-sm rounded" data-aos="zoom-out-down">
                <Row>
                  <h3 className="text-white mb-4 text-center">Enquiry Form</h3>
                  <Col md={6} className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      required
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      required
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Your Message"
                      required
                    />
                  </Col>
                  <Col md={12}>
                    <Button variant="dark" className="w-100">
                      Submit Enquiry
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div> */}
            {/* </Col> */}
          </Col>
        </Row>
      </Container>
      {/* Enquiry Form Section */}
      {/* <Container
        className="py-5 mt-5"
        style={{ backgroundColor: "#F39C12", borderRadius: "10px" }}
      >
        <h3 className="text-white mb-4 text-center">Enquiry Form</h3>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Form className="p-4 shadow-sm rounded">
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Control type="text" placeholder="Your Name" required />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                    required
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your Message"
                    required
                  />
                </Col>
                <Col md={12}>
                  <Button variant="dark" className="w-100">
                    Submit Enquiry
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container> */}
      {/* Map Section */}
      {/* <Container fluid className="p-5 mt-5">
        <h3 className="text-center mb-4">Find Us Here</h3>
        <div
          className="map-section"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            style={{ width: "100%", height: "350px", border: "0" }}
            allowFullScreen
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </Container> */}
      <div style={{ paddingBottom: "60px" }}></div>
      {/* Add some padding or margin between the contact section and footer */}
      <div style={{ paddingBottom: "60px" }}></div>{" "}
      {/* Adds space before the footer */}
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
                <p style={{ fontSize: "15px", textAlign: "justify" }}>
                  At Garg Packaging Traders LLP, we bring over 15 years of
                  expertise in the packaging industry, providing high-quality,
                  innovative, and reliable packaging solutions. With our head
                  office located in Gurgaon and a branch in Bangalore, we cater
                  to the packaging needs of businesses across multiple sectors,
                  including interior design firms and multinational
                  corporations.
                </p>
                <div>{/* <h6>Customer Service</h6> */}</div>
              </Col>

              {/* Quick Links */}
              <Col md={2} className="mb-4">
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
                      <i class="bi bi-chevron-right"></i>Service
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
                <h5>Our Services</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Bubble Wraps
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Corrugated Rolls
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Stretch Film
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Adhesive Tapes
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Thermocol
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Angle Boards
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Courier Bags
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Strapping Belts
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Polythene
                      Sheets
                    </a>
                  </li>
              
            
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Lay Paper 
                    </a>
                  </li>
                  <li>
                      <a href="/capability" className="text-white">

                        <i class="bi bi-chevron-right"></i>Flore Protection
                      </a>
                    </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Barcode Labels
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>EPE Foam Rolls
                    </a>
                  </li>
                  <li>
                    <a href="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i>Carton Boxes
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
                  &copy;2024 All Rights Reserved | Design by <Link to="https://parnetsgroup.com/" target="blank"> ParNets</Link>
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </div>
  );
}

export default ContactUs;
