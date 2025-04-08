import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "antd";
import { WhatsAppOutlined, ArrowUpOutlined } from "@ant-design/icons";
import "./FloatingActions.css";

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-actions">
      <Tooltip title="Chat with us on WhatsApp">
        <a
          href="https://web.whatsapp.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <WhatsAppOutlined />
        </a>
      </Tooltip>
      {isVisible && (
        <Button
          className="scroll-to-top-btn"
          shape="circle"
          icon={<ArrowUpOutlined />}
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};

export default FloatingActions;
