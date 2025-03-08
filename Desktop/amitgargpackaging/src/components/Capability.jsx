
import React, { useState } from "react";
import "../css/Capability.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import service from "../assests/service-01.jpg";
import service1 from "../assests/service-02.jpg";
import service2 from "../assests/service-03.jpg";
import service3 from "../assests/service-04.png";
import service4 from "../assests/service-05.png";
import service5 from "../assests/service-06.webp";
import data from "./Data.js";
import cutting1 from "../assests/1-los-angeles-blog-post-image-20240826193606.jpeg"
import cutting2 from "../assests/client-03.png"
import cutting3 from "../assests/am-0324-cutting-tools-listicle.jpg"
import { Link } from "react-router-dom";
import sheet1 from "../assests/New folder/product-250x250.jpg"
import sheet2 from "../assests/New folder/sheet-metal-forming-stamping-part-1000x1000.jpg"
import sheet3 from "../assests/New folder/sheet-metal-stamping-parts-250x250.jpg"
import forging1 from "../assests/Hot forging & Cold forging of Fasteners/Hot forging & Cold forging of Fasteners 2.webp"
import forging2 from "../assests/Hot forging & Cold forging of Fasteners/Hot forging & Cold forging of Fasteners 6.webp"
import forging3 from "../assests/Hot forging & Cold forging of Fasteners/Hot forging & Cold forging of Fasteners 7.webp"
import alumunium1 from "../assests/Aluminium & Zinc die casting parts/Aluminium & Zinc die casting parts2.webp"
import alumunium2 from "../assests/Aluminium & Zinc die casting parts/aluminum-die-castings-500x500.webp"
import alumunium3 from "../assests/Aluminium & Zinc die casting parts/casting-and-forging-parts-500x500.webp"
import precision1 from "../assests/Precision Machining parts/2-500x500.webp"
import precision2 from "../assests/Precision Machining parts/high-precision-machined-parts-500x500.webp"
import precision3 from "../assests/Precision Machining parts/img_0193-copy-500x500.webp"
import brass1 from "../assests/Brass components/aluminium-cylindrical-sleeve-2-500x500.webp"
import brass2 from "../assests/Brass components/brass-cnc-turned-component-1000x1000.webp"
import brass3 from "../assests/Brass components/brass-contact-500x500.webp"
import cad1 from "../assests/New folder/cad_cam_services_cover.jpg"
import cad2 from "../assests/New folder/product-design-development.jpg"
import cad3 from "../assests/New folder/1693572482242.jpg"
import plastics1 from "../assests/Plastic injection parts/ketron-peek-1000-500x500.webp"
import plastics3 from "../assests/Plastic injection parts/product-250x250.webp"
import plastics2 from "../assests/Plastic injection parts/plastic-injection-molding-parts-500x500.webp"
import powder1 from "../assests/Powder metallurgy Parts/0-500x500.webp"
import powder2 from "../assests/Powder metallurgy Parts/concave-mantle-500x500.webp"
import powder3 from "../assests/Powder metallurgy Parts/cone-crusher-parts-500x500.webp"
import export1 from "../assests/New folder/Import-Export-Code-Registration-1536x864.jpg"
import export2 from "../assests/New folder/container-cargo-import-export-business-logistic-3d-rendering_35761-570.jpg"
import export3 from "../assests/New folder/1702463709082.jpg"
import logo from './../assests/garg/logo_garg.jpeg';

import bubble1 from './../assests/garg/bubble1.webp';
import bubble2 from './../assests/garg/bubble2.jpg';
import bubble3 from './../assests/garg/bubble3.webp';
import currugated1 from './../assests/garg/corrugated1.jpg';
import currugated2 from './../assests/garg/corrugated2.webp';
import currugated3 from './../assests/garg/corrugated3.webp';
import adhesive1 from './../assests/garg/adhesive1.jpg';
import adhesive2 from './../assests/garg/adhesive2.jpg';
import adhesive3 from './../assests/garg/adhesive3.jpg';
import thermocol1 from './../assests/garg/thermocol1.webp';
import thermocol2 from './../assests/garg/thermocol2.webp';
import thermocol3 from './../assests/garg/thermocol3.png';
import courier1 from './../assests/Courier.jpeg';
import courier2 from './../assests/Courier1.webp';
import courier3 from './../assests/Courier3.jpg';
import angle1 from './../assests/garg/angle.jpg';
import angle2 from './../assests/garg/angle2.webp';
import angle3 from './../assests/garg/angle3.jpg';
import strapping1 from './../assests/garg/strapping1.jpg';
import strapping2 from './../assests/garg/strapping2.jpg';
import strapping3 from './../assests/garg/Strapping Belts.jpg';
import lay from './../assests/garg/LayPaper.jpg';
import lay2 from './../assests/garg/lay2.webp';
import lay3 from './../assests/garg/lay3.jpg';
import barcode1 from './../assests/garg/Barcode.jpeg';
import barcode2 from './../assests/garg/Barcode2.jpg';
import barcode3 from './../assests/garg/barcode3.webp';
import epe1 from './../assests/garg/EPE Foam Rolls.webp';
import epe2 from './../assests/garg/epe2.jpg';
import epe3 from './../assests/garg/epe3.webp';
import { useEffect } from "react";
import ThermocoleImg1 from "../assests/ThermocoleImg1.jpg"
import ThermocoleImg2 from "../assests/ThermocoleImg2.jpg"
import ThermocoleImg3 from "../assests/ThermocoleImg3.png"
import 'aos/dist/aos.css'; 
import Aos from "aos";
import StretchWraps from "../assests/garg/StretchWraps.jpg"
import StretchFilms from '../assests/stretchFilm.webp'
import StretchFilm2 from "../assests/stretchFilm2.webp"
import CartonBox1 from "../assests/CartonBox1.jpg"
import CartonBox2 from "../assests/CartonBox2.jpg"
import CartonBox3 from "../assests/CartonBox3.jpg"
import Laypaper1 from "../assests/Laypaper.webp"
import Laypaper2 from "../assests/Laypaper4.webp"
import Laypaper3 from "../assests/Laypaper5.webp"
import Poly from "../assests/Poly1.jpg"
import Flore3 from "../assests/Flore1.webp"
import Flore4 from "../assests/Flore4.webp"
import Flore5 from "../assests/Flore5.png"


function App() {

  useEffect(()=>{window.scrollTo(0,0)},[])

    useEffect(() => {
      Aos.init({ duration: 1000 }); // Initialize AOS with desired duration
    }, []);
  
  const [selectedSection, setSelectedSection] = useState(data[0].title);

  return (
    <div className="container-fluidx">
      <div className="capability-page">
        <div className="overlay"></div>
        <div className="content-wrapper1 d-flex justify-content-center align-items-center">
          <h1 className="mt-5">Products</h1>
        </div>
      </div>
      <div>
        <Container fluid className="">
          <Row className="mt-5">
            {/* Left Sidebar */}
            <Col
              md={4}
              style={{
                position: "relative",
                // top: "70px",
                // height: "calc(100vh - 70px)",
              }}
            >
              <div className="d-flex flex-column" >
                {data.map((section, index) => (
                  <Button
                    key={index}
                    data-aos="zoom-out-right"
                    className={`capabilities mb-2 button-large ${selectedSection === section.title
                        ? "selected"
                        : "btn-secondary"
                      }`}
                    onClick={() => setSelectedSection(section.title)}
                  >
                    {section.title}
                  </Button>
                ))}
              </div>
            </Col>

            {/* Scrollable Content Section */}
            <Col
              md={5}
              style={{ height: "calc(100vh - 70px)", overflowY: "scroll" }}
            >
              {data.map(
                (section, index) =>
                  selectedSection === section.title && (
                    <div key={index} data-aos="zoom-out-left">
                      <h2 className="section-title">{section.title}</h2>
                      <p>{section.description}</p>
                      {section.sections.map((sect, idx) => (
                        <div key={idx}>
                          <h3>{sect.heading}</h3>
                          <ul>
                            {sect.points.map((point, id) => (
                              <li key={id}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {section.whyChoose && (
                        <div>
                          <h3>Why Choose Our Solutions?</h3>
                          <ul>
                            {section.whyChoose.map((reason, id) => (
                              <li key={id}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
              )}
            </Col>

            {/* Right Image Section */}
            <Col
              md={3}
              className="d-md-block"
              style={{
                position: "relative",
                // top: "70px",
                // height: "calc(100vh - 70px)",
              }}
            >
              <div className="d-flex flex-column">
                {selectedSection ===
                  "Bubble Wraps" && (
                    <>
                      <img
                        src={bubble1}
                        alt="Service"
                        className="service-img mb-2"
                        data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                      />
                      <img
                        src={bubble2}
                        alt="Service"
                        className="service-img mb-2"
                        data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                      />
                      <img
                        src={bubble3}
                        alt="Service"
                        className="service-img mb-2"
                        data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                      />
                      <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                    </>
                  )}
                {selectedSection === "Corrugated Rolls" && (
                  <>
                    <img
                      src={currugated1}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={currugated2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={currugated3}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                  {selectedSection === "Stretch Film" && (
                  <>
                    <img
                      src={StretchWraps}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={StretchFilms}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={StretchFilm2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                {selectedSection ===
                  "Adhesive Tapes" && (
                    <>
                      <img
                        src={adhesive1}
                        alt="Service"
                        className="service-img mb-2"
                        data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                      />
                      <img
                        src={adhesive2}
                        alt="Service"
                        className="service-img mb-2"
                        data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                      />
                      <img
                        src={adhesive3}
                        alt="Service"
                        className="service-img mb-2"
                        data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                      />
                      <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                    </>
                  )}
                {selectedSection === "Thermocol" && (
                  <>
                    <img
                      src={ThermocoleImg1}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={ThermocoleImg2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={ThermocoleImg3}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                {selectedSection === "Courier Bags" && (
                  <>
                    <img
                      src={courier1}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={courier2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={courier3}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                {selectedSection === "Angle Boards" && (
                  <>
                    <img
                      src={angle1}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={angle2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={angle3}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                {selectedSection === "Strapping Belts" && (
                  <>
                    <img
                      src={strapping1}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={strapping2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={strapping3}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                {selectedSection === "Polythene Sheets" && (
                  <>
                    <img
                      src={lay}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={lay2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={Poly}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                {selectedSection === "Lay Paper" && (
  <>
    <img
      src={Laypaper1}
      alt="Service"
      className="service-img mb-2"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    />
    <img
      src={Laypaper2}
      alt="Service"
      className="service-img mb-2"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    />
    <img
      src={Laypaper3}
      alt="Service"
      className="service-img mb-2"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    />
 
    <a href="/contact">
      <button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2">
        Enquiry Now
      </button>
    </a>
  </>
)}

{selectedSection === "Flore Protection" && (
  <>
    <img
      src={Flore3}
      alt="Service"
      className="service-img mb-2"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    />
    <img
      src={Flore4}
      alt="Service"
      className="service-img mb-2"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    />
    <img
      src={Flore5}
      alt="Service"
      className="service-img mb-2"
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
    />
 
    <a href="/contact">
      <button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2">
        Enquiry Now
      </button>
    </a>
  </>
)}
                {selectedSection === "Barcode Labels" && (
                  <>
                    <img
                      src={barcode1}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={barcode2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={barcode3}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                {selectedSection === "EPE Foam Rolls" && (
                  <>
                    <img
                      src={epe1}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={epe2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={epe3}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
                   {selectedSection === "Carton Boxes" && (
                  <>
                    <img
                      src={CartonBox1}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={CartonBox2}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <img
                      src={CartonBox3}
                      alt="Service"
                      className="service-img mb-2"
                      data-aos="fade-up"
     data-aos-anchor-placement="top-center"
                    />
                    <a href='/contact'><button className="w-100 p-2 text-white border-0 outline-none bg-warning rounded-2" >Enquiry Now</button></a>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

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
                  At Garg Packaging Traders LLP, we bring over 15 years of expertise in the packaging industry, providing high-quality, innovative, and reliable packaging solutions. With our head office located in Gurgaon and a branch in Bangalore, we cater to the packaging needs of businesses across multiple sectors, including interior design firms and multinational corporations.
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
                <h5>Our Products</h5>
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

                      <i class="bi bi-chevron-right"></i>Polythene Sheets
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
            <Row
              className="pt-3 border-top"
              style={{ borderColor: "#F39C12" }}
            >
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

export default App;
