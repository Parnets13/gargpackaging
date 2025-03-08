import React, { useState } from "react";
import { PiArrowUp } from "react-icons/pi";
import whatspp_icon from './../assests/garg/WhatsApp_icon.png';
import { FaCircleArrowUp } from "react-icons/fa6";
function Whatsapp() {
  const phoneNumber = 9215881328;
  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in your services."
  );

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${whatsappMessage}`,
      "_blank"
    );
  };

  // Scrool window icon

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <div>
      <div>
        {/* scrooling up icon  */}
        <div>
          <div
            className="scrool-up-icon"
            style={{
              display: visible ? "inline" : "none",
              position: "fixed",
              right: "40px",
              bottom: "86px", // Adjust the bottom value as needed
              zIndex: 1000, // Ensures it's above other content
              cursor: "pointer",
            }}
            onClick={scrollToTop}
          >
            <div
              className="scrool"
              style={{
                backgroundColor: "#a67922",
                borderRadius: "5px",
                color: "white",
                padding:"2px"
              }}
            >
              <PiArrowUp style={{ fontSize: "29px" }} />
            </div>
          </div>
        </div>{" "}
        <div
          className=""
          onClick={handleClick}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px", // Adjust to give spacing between icons
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <img
            src={whatspp_icon}
            alt="sd"
            className="whatsapp-icon"
            style={{ width: "63px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Whatsapp;
