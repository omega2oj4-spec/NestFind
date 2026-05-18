import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const heroBg = "https://images.adsttc.com/media/images/5dba/e07f/3312/fd14/3300/0d85/large_jpg/stella.jpg?1572528246";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [budget, setBudget] = useState("any");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/properties", { 
      state: { 
        location: location.toLowerCase(), 
        propType: type.toLowerCase(), 
        priceRange: budget 
      } 
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <section className="hero">

        <div
          className="home-hero-bg"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="home-hero-overlay" />
        <div className="hero-content">
          <h1>Find Your <span>Dream</span> Home</h1>
          <p className="hero-subtitle">Discover the finest luxury properties across prime locations.</p>
          <p className="hero-description">Experience curated living and architectural excellence tailored to your exact lifestyle and aspirations.</p>

          <div className="container">
            <button className="b">Buy</button>
            <button className="bu">Rent</button>
            <form onSubmit={handleSearch}>
              <select className="input" value={location} onChange={e => setLocation(e.target.value)}>
                <option value="all">City or neighbourhood</option>
                <option value="all">All Locations</option>
                <option value="banana island">Banana Island</option>
                <option value="ikoyi">Ikoyi</option>
                <option value="maitama">Maitama</option>
                <option value="asokoro">Asokoro</option>
                <option value="lekki">Lekki</option>
                <option value="victoria island">Victoria Island</option>
                <option value="jabi">Jabi</option>
                <option value="wuse">Wuse</option>
                <option value="katampe">Katampe</option>
                <option value="guzape">Guzape</option>
              </select>
              <select className="input" value={type} onChange={e => setType(e.target.value)}>
                <option value="all">Property type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
              <select className="input" value={budget} onChange={e => setBudget(e.target.value)}>
                <option value="any">Max budget</option>
                <option value="0-50">₦0 - ₦50M</option>
                <option value="50-150">₦50M - ₦150M</option>
                <option value="150+">₦150M+</option>
              </select>
              <button type="submit" className="search">Search</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;