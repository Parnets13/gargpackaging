import "../css/Home.css";
import "../css/About.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import bulldozer from "../assests/bulldozer-removebg-preview.png";
import client1 from "../assests/client-01.png";
import client2 from "../assests/client-02.png";
import client3 from "../assests/client-03.png";
// import icon from "../assests/icon1.webp";
// import icon2 from "../assests/icon2.webp";
// import icon3 from "../assests/icon3.webp";
import icon from "../assests/Aluminium & Zinc die casting parts/aluminium-die-casting-parts-500x500.webp";
import icon2 from "../assests/Brass components/aluminium-cylindrical-sleeve-2-500x500.webp";
import icon3 from "../assests/cat-1/gears-jpg-500x500.webp";
import excavator from "../assests/excavator-02.webp";
import map from "../assests/map.png";
import map2 from "../assests/navy-world-map.png";
import worker from "../assests/worker.webp";
import Logo from "../assests/logo.svg";
// import Tech1 from "../assests/tech1.png";
import Tech2 from "../assests/tech2.png";
import Tech3 from "../assests/tech3.png";
import Tech4 from "../assests/tech4.png";
import Tech5 from "../assests/tech5.webp";
import cutting1 from "../assests/1-los-angeles-blog-post-image-20240826193606.jpeg";
import sheet1 from "../assests/New folder/product-250x250.jpg";
import forging1 from "../assests/Hot forging & Cold forging of Fasteners/Hot forging & Cold forging of Fasteners 2.webp";
import alumunium1 from "../assests/Aluminium & Zinc die casting parts/Aluminium & Zinc die casting parts2.webp";
import precision1 from "../assests/Precision Machining parts/2-500x500.webp";
import brass1 from "../assests/Brass components/aluminium-cylindrical-sleeve-2-500x500.webp";
import cad1 from "../assests/New folder/cad_cam_services_cover.jpg";
import plastics1 from "../assests/Plastic injection parts/ketron-peek-1000-500x500.webp";
import powder1 from "../assests/Powder metallurgy Parts/0-500x500.webp";
import export1 from "../assests/New folder/Import-Export-Code-Registration-1536x864.jpg";
import alumunium8 from "../assests/Aluminium & Zinc die casting parts/aluminum-metal-castings-500x500.webp";
import brass4 from "./../assests/Brass components/brass-precision-parts-500x500.webp";

import logo from "./../assests/garg/logo_garg.jpeg";
import BannerImg3 from "../assests/BannerImg3.png";
import adhesive from "./../assests/garg/Adhesive Tapes.webp";
import bubble1 from "../assests/garg/bubble1.webp";
import adhesive2 from "../assests/garg/adhesive2.jpg";
import bubble from "./../assests/garg/Bubble-Wrap.jpg";
import cartoon from "./../assests/garg/CartonBoxes.png";
// import name from './../assests/garg/corrugated-rolls.jpg';
// import corrugated from './../assests/garg/Courier Bags.jpg';
import corrugatedrolls from "../assests/garg/corrugatedrolls.jpg";
import epe2 from "../assests/garg/epe2.jpg";
import laypaper from "./../assests/garg/LayPaper.jpg";
import strapping from "./../assests/garg/Strapping Belts.jpg";
import stretch from "./../assests/garg/StretchWraps.jpg";
import Thermocole from "../assests/Thermocole.jpg";
import angle from "./../assests/garg/angle.jpg";
import courier from "./../assests/garg/Courier Bags.jpg";
import barcode3 from "../assests/garg/barcode3.webp";
import choose from "./../assests/garg/packing-cargo-1.png.webp";
import backgroundImg1 from "../assests/backgroundImg1.jpg";
import BannerImage1 from "../assests/BannerImage1.jpg";
import BackImg from "../assests/BackImg.jpg";
import removeTech1 from "../assests/removeTech1.png";
import Ecommerce from "../assests/Ecommerce.jpg";
import Logistic1 from "../assests/Logistic1.jpg";
import AutoMobile from "../assests/AutoMobile.jpg";
import Consumer1 from "../assests/Consumer1.png";
import Industries1 from "../assests/Industries1.png";
import AutoImg from "../assests/AutoImg.jpg";
import ParcelImg from "../assests/ParcelImg.jpg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Aos from "aos";
import ThermocoleImg from "../assests/ThermocoleImg.webp";
import Laypaper from "../assests/Laypaper.webp";
import Flore from "../assests/Flore2.webp";

const Home = () => {
  const settings = {
    dots: true, // Add pagination dots if needed
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of cards to show
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Autoplay functionality
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const navigate = useNavigate(); // For navigation

  // Function to handle clicking on the flexbox
  const handleBoxClick = () => {
    navigate("/capability");
  };

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with desired duration
  }, []);

  const handleMoreAboutClick = () => {
    navigate("/aboutus");
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dummy data for categories
  const categories = [
    {
      id: 1,
      title: "Bubble Wraps",
      img: bubble1,
      details: "Details about grading equipment",
    },
    {
      id: 2,
      title: "Corrugated Rolls",
      img: corrugatedrolls,
      details: "Details about heavy machinery",
    },
    {
      id: 3,
      title: "Stretch Film",
      img: stretch,
      details: "Details about material handling",
    },
    {
      id: 4,
      title: "Adhesive Tapes",
      img: adhesive2,
      details: "Details about transportation vehicles",
    },
    {
      id: 5,
      title: "Thermocol",
      img: ThermocoleImg,
      details: "Details about forestry equipment",
    },
    {
      id: 6,
      title: "Angle Boards",
      img: angle,
      details: "Details about agricultural machinery",
    },
    {
      id: 7,
      title: "Courier Bags",
      img: courier,
      details: "Details about agricultural machinery",
    },
    {
      id: 8,
      title: "Strapping Belts",
      img: strapping,
      details: "Details about agricultural machinery",
    },
    {
      id: 9,
      title: "Polythene Sheets",
      img: laypaper,
      details: "Details about agricultural machinery",
    },
    {
      id: 9,
      title: "Lay Paper",
      img: Laypaper,
      details: "Details about agricultural machinery",
    },
    {
      id: 9,
      title: "Flore Protection",
      img: Flore,
      details: "Details about agricultural machinery",
    },
    {
      id: 10,
      title: "Barcode Labels",
      img: barcode3,
      details: "Details about agricultural machinery",
    },
    {
      id: 11,
      title: "EPE Foam Rolls",
      img: epe2,
      details: "Details about agricultural machinery",
    },
    {
      id: 12,
      title: "Carton Boxes",
      img: cartoon,
      details: "Details about agricultural machinery",
    },
  ];

  // Function to handle category click and reveal details
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const industries = [
    {
      icon: removeTech1,
      title: "Interior Design Firms",
      description:
        "Supplying protective and aesthetic packaging for furniture, decor, and fragile items.",
      bgColor: "#CB7B5A",
    },
    {
      icon: Tech2,
      title: "Manufacturing Units",
      description:
        "Offering robust materials like corrugated rolls, strapping belts, and thermocol to safeguard machinery and components.",
      bgColor: "#D1B034",
    },
    {
      icon: Ecommerce,
      title: "E-Commerce Businesses",
      description:
        "Ensuring safe delivery of goods with reliable and cost-effective packaging solutions.",
      bgColor: "#D9D1BD", // Light blue background
    },
    {
      icon: Tech4,
      title: "Retailers & Distributors",
      description:
        "Supporting bulk packaging needs with carton boxes, adhesive tapes, and polythene sheets.",
      bgColor: "#E37500", // Light green background
    },
    {
      icon: Logistic1,
      title: "Logistics & Courier Services",
      description:
        "Providing courier bags, barcode labels, and packaging essentials for seamless operations.",
      bgColor: "#FFF6E7", // Light pink background
    },
    {
      icon: AutoImg,
      title: "Automobile Industry",
      description:
        "Delivering impact-resistant EPE foam rolls and angle boards for secure transportation of automotive parts.",
      bgColor: "#FFFFFF", // Beige background
    },
    {
      icon: Consumer1,
      title: "FMCG & Consumer Goods",
      description:
        "Crafting tailored packaging solutions to protect and showcase goods effectively.",
      bgColor: "#026A75", // Alice blue background
    },
    {
      icon: Industries1,
      title: "Construction & Infrastructure",
      description:
        "Offering specialized materials like stretch films and protective wraps for construction tools and supplies.",
      bgColor: "#888C87", // Light goldenrod yellow background
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Garg, Owner of Garg Packaging Traders",
      feedback:
        "We have been sourcing packaging materials from this company for years, and their quality is unmatched. Whether it’s corrugated rolls, adhesive tapes, or carton boxes, they provide durable and reliable products that ensure our shipments are well-protected",
    },
    {
      name: "Priya Sharma, Supply Chain Manager",
      feedback:
        "Our business requires stretch films, bubble wraps, and strapping belts for secure packaging, and this company consistently delivers top-grade materials. Their prompt service and competitive pricing have made them our trusted packaging partner.",
    },
    {
      name: "Amit Verma, E-commerce Business Owner",
      feedback:
        "The right packaging plays a crucial role in protecting our products, and this company offers everything we need—from polythene sheets and courier bags to barcode labels. Their high-quality packaging solutions have improved our logistics ",
    },
    {
      name: "Neha Kapoor, Boutique Owner",
      feedback:
        "I was looking for premium EPE foam rolls, angle boards, and lay paper to ensure my boutique’s fragile items are well-packed. This company provided exactly what I needed! Their packaging materials are durable, cost-effective, and delivered on time.",
    },
    {
      name: "Vikram Mehta, Restaurant Owner",
      feedback:
        "Their high-quality packaging solutions, including food-safe polythene sheets and carton boxes, have been essential for our restaurant’s supply chain. The products are sturdy, and deliveries are always on time. A great packaging partner!",
    },
    {
      name: "Simran Kaur, Event Planner",
      feedback:
        "From barcode labels to stretch films, this company offers all the essential packaging materials we need for our events. Their materials are reliable, and their service is top-notch. Highly recommended!",
    },
    {
      name: "Rohan Malhotra, Warehouse Manager",
      feedback:
        "Managing a warehouse requires robust and high-quality packaging materials, and this company delivers just that. Their corrugated rolls, strapping belts, and adhesive tapes have significantly improved our packaging operations. Exceptional service and quality!",
    },
  ];
  
  

  //  const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     { breakpoint: 768, settings: { slidesToShow: 1 } },
  //     { breakpoint: 992, settings: { slidesToShow: 2 } },
  //   ],
  // };

  const handleNavigate = () => {
    // Navigate to a new route, you can customize this route as needed
    navigate(`/capability`);
  };

  return (
    <div>
      <div
        className=""
        style={{
          backgroundImage: `url(${backgroundImg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Your content here */}{" "}
        <div className="row align-items-center">
          {/* Left Side (Content Section) */}
          <div className="col-lg-6">
            <div className="p-4 rounded" data-aos="fade-up">
              {/* Welcome Text */}
              <p className="welcome-text ">
                Welcome to Garg Packaging Traders LLP
              </p>

              {/* Main Heading */}
              <h1 className="main-heading">
                Elevate Your Brand Packaging with Amit Garg Packging Expertise
                and Creativity
              </h1>

              {/* Description */}
              <h3>Your Trusted Partner in Packaging Excellence</h3>

              {/* Get Started Button */}
              <a href="/aboutus">
                <button
                  className="btn mt-3"
                  style={{ backgroundColor: "#976314", color: "white" }}
                >
                  Know More
                </button>
              </a>

              {/* Flex Container for Reviews and Stats */}
              {/* <div className="d-flex justify-content-between mt-4">
          Reviews Section
          <div>
            <div className="d-flex align-items-center">
              <div className="text-warning">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    aria-hidden="true"
                    className="me-1"
                    style={{ width: "20px", height: "20px",color:"#D4AF37" }}
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path>
                  </svg>
                ))}
              </div>
              <span className="ms-2">4.8</span>    

              <div>
            <h4>2000+</h4>
            <p>Booking</p>
          </div>
            <div>
            <h4>10+</h4>
            <p>Services</p>
          </div>
          </div>
          <p className="mb-0">Trusted by 2k+ Clients</p>

            </div>

      
       
        
        </div> */}
            </div>
          </div>

          {/* Right Side (Image Section) */}
          <div className="col-lg-6">
            <div className="p-4  rounded  d-flex justify-content-center align-items-center">
              <img
                src={BannerImage1}
                alt="Excavator"
                data-aos="zoom-in-down"
                className="img-fluid rounded"
                style={{
                  maxHeight: "400px",
                  width: "600px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button
          className="custom-button"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <span className="circle-icon">●</span>
          Quality You Can Trust!
        </button>
        <button
          className="custom-button"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <span className="circle-icon">●</span>
          Act Fast, Save More!
        </button>
        <button
          className="custom-button"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <span className="circle-icon">●</span>
          Innovation at Its Best!
        </button>
        <button
          className="custom-button"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <span className="circle-icon">●</span>
          Smart Choices, Big Savings!
        </button>
      </div>

      {/* Machinerex Section */}

      <div className="container">
        <h3 className="text-warning text-center" style={{ fontSize: "1.5rem" }}>
          Who We Serve
        </h3>
        <h1
          className="text-center mb-4"
          style={{ color: "#976314", fontSize: "2.5rem" }}
        >
          We cater to a wide array of industries, including:
        </h1>
        <div
          className="why-machinerex p-5"
          style={{
            backgroundImage: `url(${BackImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div
            className="row justify-content-center g-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            {industries.map((industry, index) => (
              <div
                key={index}
                className="col-12 col-md-6 col-lg-3"
                onClick={handleBoxClick}
              >
                <div
                  className="card text-black p-3 h-100 animate__animated animate__fadeInUp animated-slide-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    borderRadius: "8px",
                    backgroundColor: industry.bgColor,
                  }}
                >
                  <div className="card-body">
                    <img
                      src={industry.icon}
                      alt={industry.title}
                      className="mb-3"
                      style={{ maxWidth: "100px", verticalAlign: "middle" }}
                    />
                    <h2
                      className="card-title mb-2"
                      style={{ fontSize: "18px" }}
                    >
                      {industry.title}
                    </h2>
                    <p className="card-text" style={{ fontSize: "14px" }}>
                      {industry.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Container className="category-grid py-5">
        <Row>
          <Col lg={12} className="text-center">
            <h6 className="welcome-text text-warning">Let's Choose</h6>
            <h2 className="main-heading">Select Your Ideal Service</h2>
          </Col>
        </Row>

        <Row className="mt-4">
          {categories.map((category) => (
            <Col lg={4} md={4} className="mb-2" key={category.id}>
              <Card
                className="category-card position-relative overflow-hidden"
                data-aos="flip-left"
              >
                <a href="/capability">
                  <Card.Img
                    variant="top"
                    src={category.img}
                    alt={category.title}
                    className="category-img"
                  />
                </a>
                <Card.Body className="category-body">
                  <div
                    className="category-section"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <h5 className="text-light">{category.title}</h5>
                  </div>
                </Card.Body>

                {/* Eye Icon for Navigation */}
                <div className="hover-overlay d-flex justify-content-center align-items-center">
                  <i
                    className="bi bi-eye text-light fs-3"
                    onClick={() => handleNavigate(category.id)} // Navigate on click
                  ></i>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* How It Works */}

      <div className="main-section">
        <Container fluid className="d-flex justify-content-center my-4">
          <Card
            className="bg-warning p-4 d-flex flex-column flex-md-row align-items-center rounded"
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-center"
            style={{ maxWidth: "100%", width: "100%", maxHeight: "100%" }}
          >
            <Row className="w-100 align-items-center">
              <Col
                md={8}
                className="d-flex flex-column flex-md-row align-items-center border-md-end border-white mb-3 mb-md-0 pe-md-4"
              >
                <div className="text-center text-md-start mb-3 mb-md-0">
                  <img
                    src={Logo}
                    alt="Service Icon"
                    style={{ maxHeight: "80px", maxWidth: "80px" }}
                    className="mb-3 mb-md-0"
                  />
                </div>
                <div className="ms-md-4 text-center text-md-start">
                  <p className="text-white fs-5 fs-md-4 fs-lg-2 fw-bold mb-0">
                    Garg packaging Trader LLP is proud to serve you
                    <br className="d-none d-md-block" /> 24/7. Just Call Us when
                    you need
                  </p>
                </div>
              </Col>
              <Col
                md={4}
                className="d-flex flex-column justify-content-center text-center"
              >
                <p className="text-white fs-6 fs-md-5 fw-bold mb-1">
                  Call Us Anytime
                </p>
                <p className="text-primary fs-5 fs-md-4 fw-bold text-decoration-underline mb-0">
                  (+91) 9215881328 / 8588065330
                </p>
              </Col>
            </Row>
          </Card>
        </Container>

        {/* Main Section with Text and Image */}
        <div className="main-content-section py-5">
          <Container>
            <Row className="align-items-center">
              {/* Left Side - Text Content */}
              <Col lg={6} md={6} sm={12} className="mb-4 mb-md-0">
                <div
                  className="text-content text-center text-md-start"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                >
                  <p className="trusted-text text-warning mb-2 fs-5 fw-semibold">
                    Why Choose Garg Packaging Traders LLP?
                  </p>
                  <h2 className="mb-4 fs-3 fw-bold">
                    Choose Quality, Choose Us!
                  </h2>
                  <ul>
                    <li className="text-light">
                      <span className="fw-bolder fs-5">Global Standards:</span>
                      Products and services designed to match international
                      benchmarks
                    </li>
                    <li className="text-light">
                      <span className="fw-bolder fs-5">Expert Team: </span> A
                      dedicated team of supply chain engineers ensuring top-tier
                      quality.
                    </li>
                    <li className="text-light">
                      <span className="fw-bolder fs-5">
                        Industry Adaptability:
                      </span>
                      Serving a wide range of sectors with cutting-edge
                      solutions.
                    </li>
                    <li className="text-light">
                      <span className="fw-bolder fs-5">
                        Ethical Operations:
                      </span>
                      Conducting business with integrity and respect for people
                      and communities.
                    </li>
                  </ul>
                </div>
              </Col>

              {/* Right Side - Excavator Image */}
              <Col
                lg={6}
                md={6}
                sm={12}
                className="d-flex justify-content-center"
              >
                <div
                  className="image-section"
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                >
                  <img src={choose} alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="my-5">
          <Row className="text-center mb-4">
            <Col>
              <h6 className="welcome-text">Story Of Client</h6>
              <h2 className="main-heading">
                Enhance Efficiency with Built’s Trusted Equipment
              </h2>
            </Col>
          </Row>

          <Row
            className="gx-4 gy-4 align-items-stretch g-2"
            style={{
              backgroundImage: `url(${ParcelImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              color: "white",
              padding: "25px",
            }}
          >
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <Col
                  key={index}
                  lg={4}
                  md={6}
                  sm={12}
                  className="d-flex align-items-stretch"
                >
                  <Card
                    className="d-flex flex-column"
                    style={{ height: "350px", width: "90%" }}
                    data-aos="zoom-in"
                  >
                    <Card.Body className="d-flex flex-column justify-content-between ">
                      <div style={{ textAlign: "justify" }}>
                        <h6 className="client-name">
                          <strong>{testimonial.name}</strong>
                        </h6>
                        <p className="client-title mt-3">
                          {testimonial.feedback}
                        </p>
                      </div>
                      <div className="quote-icon text-end fs-3 mt-5">“ ”</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Slider>
          </Row>
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
                  <p style={{ fontSize: "15px", textAlign: "justify" }}>
                    At Garg Packaging Traders LLP, we bring over 15 years of
                    expertise in the packaging industry, providing high-quality,
                    innovative, and reliable packaging solutions. With our head
                    office located in Gurgaon and a branch in Bangalore, we
                    cater to the packaging needs of businesses across multiple
                    sectors, including interior design firms and multinational
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
                    ></i>
 <a href="mailto:info.gargpackaging@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>
    info.gargpackaging@gmail.com
  </a>                  </p>
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
    </div>
  );
};

export default Home;
