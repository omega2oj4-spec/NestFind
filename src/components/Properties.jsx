import React from "react";
import "./Properties.css";
import Filter from "./Filter";
import Navbar from "./Navbar";
const heroBg = "https://avatars.mds.yandex.net/i?id=1f26b6714ddc8074b38e74d9f0ab317496ad6966-5221937-images-thumbs&n=13";

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