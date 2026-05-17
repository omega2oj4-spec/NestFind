import React from "react";
import { useNavigate } from "react-router-dom";
import properties from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  const handleToggleFavorite = (e, id) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="favorites-page">
      <Navbar />
      
      <div className="favorites-hero">
        <div className="hero-content">
          <h1>Your Favorites</h1>
          <p>Properties you've saved for later.</p>
        </div>
      </div>

      <div className="favorites-container">
        {favoriteProperties.length === 0 ? (
          <div className="no-favorites">
            <div className="empty-icon">❤️</div>
            <h3>No favorites yet</h3>
            <p>Start browsing and save properties you love!</p>
            <button onClick={() => navigate("/properties")} className="browse-btn">
              Browse Listings
            </button>
          </div>
        ) : (
          <div className="properties-grid">
            {favoriteProperties.map(property => (
              <div 
                className="property-card" 
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <div className="card-image-wrapper">
                  <img src={property.image} alt={property.name} className="property-img" />
                  
                  <button 
                    className="favorite-btn active"
                    onClick={(e) => handleToggleFavorite(e, property.id)}
                    aria-label="Remove from favorites"
                  >
                    ❤️
                  </button>
                  
                  <div className="price-tag">{property.price}</div>
                  <div className="property-badges">
                    {(property.badge || []).map((b, i) => (
                      <div key={i} className={`listing-type ${b.toLowerCase().replace(" ", "-")}`}>
                        {b}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-details">
                  <div className="property-location">{property.location}</div>
                  <h3 className="property-name">{property.name}</h3>
                  <div className="property-features">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.sqft.toLocaleString()} Sqft</span>
                  </div>
                  <div className="property-address">{property.address}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
