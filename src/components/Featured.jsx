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
                {favorites.includes(p.id) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="orangered" stroke="orangered" strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0b0f19' }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                )}
              </button>

              <div className="prop-badges">
                {(p.badge || []).map((b, i) => (
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