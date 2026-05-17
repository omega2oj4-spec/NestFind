import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.css";
import buildImg from "../assets/build.jpg";
import buildImg1 from "../assets/build1.jpg";
import buildImg2 from "../assets/build2.jpg";
import buildImg3 from "../assets/build3.jpg";
import buildImg4 from "../assets/build4.jpg";
import buildImg5 from "../assets/build5.jpg";

import properties from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";

const Featured = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { favorites, toggleFavorite } = useFavorites();
  const fallbackHouse = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackHouse;
  };

  const handleToggleFavorite = (e, id) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  useEffect(() => {
    const carousel = scrollRef.current;
    if (!carousel) return;

    let interval = setInterval(() => {
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += 1;
      }
    }, 10);

    const pause = () => clearInterval(interval);
    const resume = () => {
      interval = setInterval(() => {
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1;
        }
      }, 10);
    };

    carousel.addEventListener("mouseenter", pause);
    carousel.addEventListener("mouseleave", resume);

    return () => {
      clearInterval(interval);
      carousel.removeEventListener("mouseenter", pause);
      carousel.removeEventListener("mouseleave", resume);
    };
  }, []);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth"
    });
  };

  return (
    <div className="content">
      <div className="featured-header">
        <div>
          <h5 className="featured-sub">Handpicked for you</h5>
          <h1 className="featured-title">Featured Listings</h1>
        </div>
        <div className="header-right">
          <div className="scroll-btns">
            <button className="scroll-btn" onClick={() => scroll("left")}>‹</button>
            <button className="scroll-btn" onClick={() => scroll("right")}>›</button>
          </div>
          <button className="butt" onClick={() => navigate("/properties")}>View All Properties →</button>
        </div>
      </div>

      <div className="carousel" ref={scrollRef}>
        {properties.slice(0, 12).map((p) => (
          <div className="prop-card" key={p.id} onClick={() => navigate(`/property/${p.id}`)}>
            <div className="prop-img-wrap">
              <img src={p.image} alt={p.name} className="prop-img" onError={handleImageError} />
              
              <button 
                className={`favorite-btn ${favorites.includes(p.id) ? 'active' : ''}`}
                onClick={(e) => handleToggleFavorite(e, p.id)}
                aria-label="Add to favorites"
              >
                {favorites.includes(p.id) ? '❤️' : '🤍'}
              </button>

              <div className="prop-badges">
                {p.badge.map((b, i) => (
                  <span key={i} className={`badge ${b === "NEW" ? "badge-new" : b === "FOR RENT" ? "badge-rent" : "badge-sale"}`}>{b}</span>
                ))}
              </div>
              <div className="prop-price">{p.price}</div>
            </div>
            <div className="prop-body">
              <p className="prop-location">{p.location}</p>
              <h3 className="prop-name">{p.name}</h3>
              <div className="prop-features">
                <span>🛏 {p.beds} Beds</span>
                <span>🚿 {p.baths} Baths</span>
                <span>📐 {p.sqft} Sqft</span>
              </div>
              <p className="prop-address">📍 {p.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;