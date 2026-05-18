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

