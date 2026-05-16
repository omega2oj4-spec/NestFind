import React from "react";
import "./Properties.css";
import heroBg from '../assets/pent1.jpg';
import Filter from "./Filter";
import Navbar from "./Navbar";

const Properties = () => {
  return (
    <div className="property">
      <Navbar />
      
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="property-content">
        <h5>BROWSE LISTINGS</h5>
        <h1>All listings</h1>
        <p>Browse Exclusive Properties.</p>
      </div>

      <Filter />
    </div>
  );
};

export default Properties;