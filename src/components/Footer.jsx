import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>  Nest<span>Find</span></h2>
            <p>Redefining the luxury real estate experience. We connect buyers and sellers with properties</p>
          </div>
          <div className="footer-links">
            <h3>Properties</h3>
            <ul>
              <li><a href="#">For sale</a></li>
              <li><a href="#">For rent</a></li>
              <li><a href="#">Featured listing</a></li>
              <li><a href="#">New listing</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About us</a></li>
              <li><a href="#">Our team</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-help">
            <h3>Services</h3>
            <p>Buy a house</p>
            <p>Sell a house</p>
            <p>Property management</p>
            <p>Investment</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>+1(555)123-567.</p>
          <p>NestFind@gmail.com.</p>
          <p>&copy; Establishment All reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;