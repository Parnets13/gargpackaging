import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const Hero = () => {
  // Custom Previous Arrow
  const PrevArrow = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
        fontSize: "1rem",
        color: "#9CA3AF",
      }}
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 10,
        cursor: "pointer",
        fontSize: "1rem",
        color: "#9CA3AF",
      }}
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />, // Use custom Previous Arrow
    nextArrow: <NextArrow />, // Use custom Next Arrow
  };

  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/testimonials/getBanners"
      );
      console.log(response.data);
      setBanners(response.data.slice(0, 3)||[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Slider {...settings}>
        {banners?.map((banner) => (
          <div key={banner?._id} style={{ height: "360px"}}>
            <img
              src={`http://localhost:3003

${banner?.image}`}
              alt={banner?.title || "Banner"} // Provide an alt description for accessibility
              style={{
                width: "100%",
                height: "360px",
                objectFit: "cover",
                borderRadius: ".5rem",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
