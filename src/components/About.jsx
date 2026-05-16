
import React from "react";
import "./About.css";
import aboutImg from "../assets/about.jpg";

const About = () => {
  return (
    <div className="about" id="about">
      <img src={aboutImg} alt="about" className="about-img" />
      <div className="about-text">
        <h5>About us</h5>
        <p>We believe great architecture begins with a deep understanding of people, place and purpose. Every line we draw & every material we choose is guided by a commitment to timeless design.</p>
       <button className="bell">Know more about us</button>
   

 

      <div className="about-stats">

        <div className="about-stat">
            <h2>2,400+</h2>
            <h5>Properties Sold</h5>
            <p>Delivering timeless, functional spaces through innovation, precision, and client-focused design excellence.</p>
          </div>

        <div className="about-stat">
            <h2>1,200+</h2>
            <h5>Happy Clients</h5>
            <p>Delivering timeless, functional spaces through innovation, precision, and client-focused design excellence.</p>
          </div>

        <div className="about-stat">
            <h2>15+</h2>
            <h5>Years of Experience</h5>
            <p>Delivering timeless, functional spaces through innovation, precision, and client-focused design excellence.</p>
          </div>

        <div className="about-stat">
            <h2>$4.2B</h2>
            <h5>In Sales Volume</h5>
            <p>Delivering timeless, functional spaces through innovation, precision, and client-focused design excellence.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;