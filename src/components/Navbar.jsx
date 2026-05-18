import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();
  const isLightPage = location.pathname.startsWith("/property/");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
      <nav className={`navbar ${scrolled ? "scrolled" : ""} ${isLightPage ? "light-page" : ""} ${menuOpen ? "menu-open" : ""}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={handleHomeClick}>
            Nest<span>Find</span>
          </Link>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/" onClick={handleHomeClick}>Home</Link>
            <Link to="/properties" onClick={() => setMenuOpen(false)}>Properties</Link>
            <Link to="/favorites" onClick={() => setMenuOpen(false)} className="fav-nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="orangered" stroke="orangered" strokeWidth="1" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
              </svg>
              Favorites {favorites.length > 0 && <span className="fav-count">{favorites.length}</span>}
            </Link>
            <button onClick={() => scrollToSection("about")} className="nav-btn">About</button>
            <button onClick={() => scrollToSection("contact")} className="nav-cta-btn">Get in Touch</button>
          </div>

          <div className="nav-actions">
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

