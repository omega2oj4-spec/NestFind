import React from "react";
import "./Properties.css";
import Filter from "./Filter";
import Navbar from "./Navbar";

const heroBg = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600";

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