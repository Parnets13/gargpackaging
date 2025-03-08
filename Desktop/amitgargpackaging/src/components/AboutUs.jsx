import React from "react";
import "../css/About.css";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Carousel,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assests/Aluminium & Zinc die casting parts/aluminium-die-casting-parts-500x500.webp";
import icon2 from "../assests/Brass components/aluminium-cylindrical-sleeve-2-500x500.webp";
import icon3 from "../assests/cat-1/gears-jpg-500x500.webp";
import interior from "../assests/interior.jpg";
import expert1 from "../assests/expert-01.png";
import expert2 from "../assests/expert-02.png";
import expert3 from "../assests/expert-03.png";
import expert4 from "../assests/expert-04.png";
import commercial from "../assests/commercial-01.jpg";
import commercial1 from "../assests/commercial-02.webp";
import mission from "./../assests/mission.webp";
import vision from "./../assests/vision.jpg";
import alumunium8 from "../assests/Aluminium & Zinc die casting parts/aluminum-metal-castings-500x500.webp";
import brass4 from "./../assests/Brass components/brass-precision-parts-500x500.webp";
import 'aos/dist/aos.css'; 
import Aos from "aos";


import logo from './../assests/garg/logo_garg.jpeg';

import pm1 from './../assests/garg/p&m.jpg';
import pm2 from './../assests/garg/p&m2.jpeg';
import pm3 from './../assests/garg/p&m3.jpg';
import pm4 from './../assests/garg/p&m4.jpg';
import AboutImg1 from "../assests/AboutImg1.png"
import AboutImg2 from "../assests/AboutImg2.png"
import AboutImg3 from "../assests/AboutImg3.webp"
import { useEffect } from "react";
import AboutBanner from "../assests/AboutBanner.jpg"

const AboutPage = () => {
  const navigate = useNavigate();

  // const handleMoreAboutClick = () => {
  //   navigate("/aboutus");
  // };

    useEffect(() => {
      Aos.init({ duration: 1000 }); // Initialize AOS with desired duration
    }, []);

  const experts = [
    {
      name: "Tom Holland",
      title: "CEO & Founder",
      image: expert1,
      facebook: "#",
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Zendaya",
      title: "CEO & Founder",
      image: expert2,
      facebook: "#",
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Tobey Maguire",
      title: "CEO & Founder",
      image: expert3,
      facebook: "#",
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Marisa Tomei",
      title: "CEO & Founder",
      image: expert4,
      facebook: "#",
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  ];

  return (
    <div className="about-page-container" style={{ paddingTop: "10px" }}>
      {/* Adjust top padding */}
      <div className="about-page">
        {/* Navbar */}

        {/* Content below Navbar */}
        <div className="content-wrapper" >
          <h1>About Us</h1>
          {/* <div className="breadcrumb1">
            <i className="fa-solid fa-house-chimney"></i>
            <Link><span className="me-3">Home </span></Link>
            <i className="fa-regular fa-address-card"></i>
            <span>About Us</span>
          </div> */}
        </div>
      </div>
      <div className="container"  style={{
   marginTop:'30px',
    backgroundImage: `url(${AboutBanner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
        <div className="row justify-content-center align-items-center" >
        <div className="col-md-6" data-aos="zoom-in-right" >
  <Row className="gx-3 gy-3" >
    <Col md={6}>
      <img
        src={AboutImg1}
        alt=""
         className="image-hover-effect"
        style={{ width: "100%",height:'150px', borderRadius: "14px" }}
      />
    </Col>
    <Col md={6}>
      <img
        src={AboutImg2}
        alt=""
         className="image-hover-effect"
        style={{ width: "100%",height:'150px', borderRadius: "14px" }}
      />
    </Col>
    <Col md={6}>
      <img
        src={AboutImg3}
        alt=""
         className="image-hover-effect"
        style={{ width: "100%",height:'150px', borderRadius: "14px" }}
      />
    </Col>
    <Col md={6}>
      <img
        src={pm4}
        alt=""
         className="image-hover-effect"
        style={{ width: "100%",height:'150px', borderRadius: "14px" }}
      />
    </Col>
  </Row>
</div>


          <div className="col-md-6" data-aos="zoom-in-left">
            <Container className="about-us-container py-5" >
              <Row >
                <Col lg={12} className="text-center">
                  <h6 className="text-warning">About Us</h6>
                  <h2 className="text-warning" style={{ color: "#2d4d7c" }}>Your Trusted Partner for Hassle-Free Relocation.</h2>
                </Col>
              </Row>

              {/* <Row className="text-center my-4">
                <Col lg={4} md={12}>
                  <div className="d-inline-block">
                    <span className="badge bg-warning text-dark">
                      Range of Equipment
                    </span>
                  </div>
                </Col>
                <Col lg={4} md={12}>
                  <div className="d-inline-block">
                    <span className="badge bg-warning text-dark">
                      Competitive Pricing
                    </span>
                  </div>
                </Col>
                <Col lg={4} md={15}>
                  <div className="d-inline-block">
                    <span className="badge bg-warning text-dark">
                      Experts Support
                    </span>
                  </div>
                </Col>
              </Row> */}

              <Row className="">
                <Col lg={12}>
                  <p style={{color:'white'}}>
                    At <span style={{ color:'dodgerblue' }} className="fw-bold">Garg Packaging Traders LLP</span>, we bring over 15 years of expertise in the packaging industry, providing high-quality, innovative, and reliable packaging solutions. With our head office located in Gurgaon and a branch in Bangalore, we cater to the packaging needs of businesses across multiple sectors, including interior design firms and multinational corporations.
                  </p>

                  <p style={{color:'white'}}>As a trusted manufacturer and supplier, we specialize in a wide range of packaging materials such as bubble wraps, corrugated rolls, stretch films, adhesive tapes, thermocol, angle boards, courier bags, and more. Our extensive product portfolio is designed to meet the diverse requirements of our clients, ensuring durability and functionality.</p>

                  {/* <p>Our team is committed to delivering customized solutions that align with our clients' unique needs. With a strong presence in both Gurgaon and Bangalore, we take pride in fostering long-term partnerships with our customers, built on trust, quality, and timely delivery.</p> */}

                  <p style={{color:'white'}}>
                    At Garg Packaging Traders LLP, our mission is to continuously innovate and adapt, providing superior packaging solutions that contribute to the success of our clients’ businesses.
                  </p>
                </Col>
              </Row>
              <hr style={{color:'white'}} className="my-4" />
            </Container>
          </div>

          {/* <div>
            <Container className="about-us-container py-5">
              <Row>
                <h3 className="machinerex-title" style={{ fontSize: "1.5rem" }}>
                  Leadership
                </h3>
                <h1
                  className="machinerex-subtitle"
                  style={{
                    color: "black",
                    // textAlign: "center",
                    fontSize: "2.5rem",
                    margin: "10px 0",
                  }}
                >
                  At PreciseAxis, leadership is defined by:
                </h1>
                <div className="leadership">
                  <p>
                    •
                    <span className="fw-bolder fs-5">Visionary Strategy:</span>{" "}
                    Driving growth through well-defined enterprise strategies.
                  </p>
                  <p>
                    •
                    <span className="fw-bolder fs-5">
                      
                      Agility & Scalability:
                    </span>
                    Ensuring swift scalability with multiple supply chain
                    strategies for 10x efficiency.
                  </p>
                  <p>
                    •
                    <span className="fw-bolder fs-5">
                      Global Supplier Network:
                    </span>
                    Collaborating with a network of world-class suppliers,
                    delivering reliable solutions across industries.
                  </p>
                  <p>
                    •
                    <span className="fw-bolder fs-5">
                      Commitment to Integrity:
                    </span>
                    Upholding ethical practices and contributing to the
                    communities we serve.
                  </p>
                </div>
              </Row>
            </Container>
          </div> */}
        </div>
      </div>
      {/* <div style={{ fontFamily: "'Arial', sans-serif" }}>
     
        <Container className="my-5">
          <h2 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Mission</h2>
          <Row className="align-items-center mb-6 mission-vision-section">
            <Col md={6}>
              <div className="zoom-effect">
                <img
                  src={mission}
                  alt="Mission"
                  className="img-fluid rounded w-75"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="zoom-effect">
                <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                  To deliver high-quality engineering components, cutting tools,
                  and services that incorporate modern design and production
                  methodologies, meeting and exceeding global standards. We are
                  committed to fostering sustainable growth by maintaining
                  ethical practices, ensuring reliability, and continuously
                  enhancing operational excellence across all sectors we serve.
                </p>
              </div>
            </Col>
          </Row>

          <h2 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Vision</h2>
          <Row className="align-items-center mb-6 mission-vision-section">
            <Col md={6}>
              <div className="zoom-effect">
                <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                  To be a global leader in the engineering and manufacturing
                  industry, recognized for innovation, quality, and ethical
                  business practices. Our vision is to build a robust supply
                  chain ecosystem that empowers industries with
                  precision-engineered solutions, driving efficiency and
                  creating long-term value for our customers, employees, and
                  stakeholders.
                </p>
              </div>
            </Col>
            <Col md={5}>
              <div className="zoom-effect">
                <img src={vision} alt="Vision" className="img-fluid rounded" />
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}

      {/* <Container className="my-5">
        <h6 className="text-center text-warning">Meet Our Experts</h6>
        <h2 className="text-center">The Minds Behind Our Success</h2>
        <p className="text-center text-muted">
          Our strength lies in our people. Our team is composed of highly
          skilled engineers, designers, supply chain experts, and quality
          control specialists who work together seamlessly to deliver the best
          solutions for our clients. With a shared commitment to excellence,
          innovation, and customer satisfaction, each team member plays a
          crucial role in achieving our mission to provide top-quality
          engineering components and services.
        </p>

      
      </Container> */}

      <div>
        <Container className="steps-section">
          <div className="text-center mb-4">
            <h5 className="welcome-text text-warning">What Choose Us</h5>
            <h2 className="section-title" style={{ color: "#2d4d7c" }}>
              Moving Made Simple – Expert Packers at Your Service
            </h2>
          </div>

          <Row className="g-4" >
            {/* Step 1 */}
            <Col lg={6} md={6} data-aos="flip-left">
              <div className="step-box">
                <div className="step-icon">
                  <i className="bi bi-search"></i> {/* Bootstrap Icon */}
                </div>
                <div className="step-content" >
                  <h3 className="font-bolder text-white">
                    15+ Years of Expertise
                  </h3>
                  <p className="text-light">
                    With over a decade and a half of experience, we bring unmatched knowledge and professionalism to every project.
                  </p>
                </div>
                <div className="step-number">01</div>
              </div>
            </Col>

            {/* Step 2 */}
            <Col lg={6} md={6} data-aos="flip-left"> 
              <div className="step-box">
                <div className="step-icon">
                  <i className="bi bi-calendar"></i> {/* Bootstrap Icon */}
                </div>
                <div className="step-content">
                  <h3 className="font-bolder text-white">
                    Reliable Manufacturing
                  </h3>
                  <p className="text-light">
                    As manufacturers, we maintain strict quality control at every stage, ensuring durable and efficient packaging solutions for all industries.
                  </p>
                </div>
                <div className="step-number">02</div>
              </div>
            </Col>

            {/* Step 3 */}
            <Col lg={6} md={6} data-aos="flip-left">
              <div className="step-box">
                <div className="step-icon">
                  <i className="bi bi-cart"></i> {/* Bootstrap Icon */}
                </div>
                <div className="step-content">
                  <h3 className="font-bolder text-white">
                    Custom Solutions
                  </h3>
                  <p className="text-light">
                    We understand that each business is unique. Our team works closely with you to deliver packaging solutions that match your specific requirements.
                  </p>
                </div>
                <div className="step-number">03</div>
              </div>
            </Col>

            {/* Step 4 */}
            <Col lg={6} md={6} data-aos="flip-left">
              <div className="step-box">
                <div className="step-icon">
                  <i className="bi bi-truck"></i> {/* Bootstrap Icon */}
                </div>
                <div className="step-content">
                  <h3 className="font-bolder text-white">
                  Timely Delivery
                  </h3>
                  <p className="m-0 p-0 text-light">
                  We value your time and ensure prompt delivery to keep your operations running smoothly.
                  </p>
                </div>
                <div className="step-number">04</div>
              </div>
            </Col>

            {/* Step 5 */}
            <Col lg={6} md={6} data-aos="flip-left">
              <div className="step-box">
                <div className="step-icon">
                  <i class="fa-solid fa-layer-group"></i>
                </div>
                <div className="step-content">
                  <h3 className="text-light">Trusted by Leading Companies</h3>
                  <p className="m-0 p-0 text-light">
                    Our clientele includes renowned interior design firms and multinational corporations, reflecting our commitment to excellence and reliability.
                  </p>
                </div>
                <div className="step-number">05</div>
              </div>
            </Col>

            {/* Step 6 */} 
            <Col lg={6} md={6} data-aos="flip-left">
              <div className="step-box">
                <div className="step-icon">
                  <i class="fa-solid fa-headphones"></i>
                </div>
                <div className="step-content">
                  <h3 className="text-light">Diverse Product Range</h3>
                  <p className="m-0 p-0 text-light">
                  From bubble wraps and corrugated rolls to thermocol and barcode labels, we offer a comprehensive selection of high-quality packaging materials tailored to your needs.
                  </p>
                </div>
                <div className="step-number">06</div>
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
                      <i class="bi bi-chevron-right"></i> Home
                      </a>
                    </li>
                    <li>
                      <a href="/AboutUs" className="text-white">
                      <i class="bi bi-chevron-right"></i> About Us
                      </a>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white"> 
                      <i class="bi bi-chevron-right"></i>  Products
                        </Link>
                    </li>
                    <li>
                      <a href="/contact" className="text-white">
                      <i class="bi bi-chevron-right"></i> Contact Us
                      </a>
                    </li>
                  </ul>
                </Col>

                {/* Our Service */}
                <Col md={3} className="mb-4">
                  <h5>Our Services</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/capability" className="text-white">
                      <i class="bi bi-chevron-right"></i> Bubble Wrap
                       </Link>
                
                    </li>
                    <li>
                      <Link to="/capability" className="text-white"> 
                      <i class="bi bi-chevron-right"></i> Corrugated Rolls
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white">

                      <i class="bi bi-chevron-right"></i> Stretch Film
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white"> 

                      <i class="bi bi-chevron-right"></i> Adhesive Tapes
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white">

                      <i class="bi bi-chevron-right"></i> Thermocol
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white">

                      <i class="bi bi-chevron-right"></i> Angle Boards
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white">

                      <i class="bi bi-chevron-right"></i> Courier Bags
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white"> 

                      <i class="bi bi-chevron-right"></i>Strapping Belts
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white"> 

                      <i class="bi bi-chevron-right"></i>Polythene Sheets
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white"> 

                      <i class="bi bi-chevron-right"></i>Lay Paper 
                        </Link>
                    </li>
                    <li>
                      <a href="/capability" className="text-white">

                        <i class="bi bi-chevron-right"></i>Flore Protection
                      </a>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white">

                      <i class="bi bi-chevron-right"></i> Barcode Labels
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white">

                      <i class="bi bi-chevron-right"></i> EPE Foam Rolls
                        </Link>
                    </li>
                    <li>
                      <Link to="/capability" className="text-white">

                      <i class="bi bi-chevron-right"></i> Carton Boxes
                        </Link>
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
                    &copy; 2024 All Rights Reserved | Design by <Link to="https://parnetsgroup.com/" target="blank"> ParNets</Link>
                  </p>
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
      
    </div>
  );
};

export default AboutPage;
