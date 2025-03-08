// src/components/Button.js
import React from 'react';
// import './Button.css'; // Create this file for styling

const Button = ({ text, link }) => {
  return (
    <a href={link} className="button">{text}</a>
  );
};

export default Button;
