import React from 'react';
import '../css/Appointment.css';

const Appointment = () => {
  return (
    <div className="appointment-container">
      <div className="appointment-content">
        <h1>Book an Appointment</h1>
        <p>Please fill out the form below to schedule your appointment. We will contact you with confirmation soon!</p>
        
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Your Name" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Number:</label>
            <input type="number" id="number" placeholder="Your Phone Number" />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" placeholder="Your Message" rows="4"></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
