import React from "react";
import "./Last.css";

const Last = () => {
  return (
    <div style={{ backgroundImage: `url('https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzAyNTkxMjE=/original/7e346b07-814a-47bc-96e2-6cbae9f8a71f.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="last-container">
      <div className="last">
        <h5>Ready to Begin</h5>
        <h1>Let's Find Your Perfect <br /> Property Together</h1>
        <p>Our expert team is ready to help you find the ideal property that meets your needs and budget.</p>
        
        <div className="contact-info-grid">
          <div className="contact-info-item">
            <span className="icon">📍</span>
            <div className="text">
              <h6>Head Office</h6>
              <p>88 Glover Road, Ikoyi, Lagos</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="icon">📞</span>
            <div className="text">
              <h6>Phone Number</h6>
              <p>+234 803 766 4198</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="icon">✉️</span>
            <div className="text">
              <h6>Email Us</h6>
              <p>hello@nestfind.gmail.com</p>
            </div>
          </div>
        </div>

        <div className="last-btns">
          <button className="prop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Browse properties</button>
          <button className="props">Speak to an agent</button>
        </div>
      </div>
    </div>
  );
};

export default Last;