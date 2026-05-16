import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import properties from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";
import "./PropertyDetail.css";
import Navbar from "./Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const property = properties.find((p) => p.id === parseInt(id));
  const [activeImage, setActiveImage] = React.useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return (
      <div className="not-found">
        <h2>Property Not Found</h2>
        <Link to="/properties">Back to Listings</Link>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="detail-page">
      <Navbar />
      
      <div className="detail-container">
        <div className="detail-header">
          <div className="header-left">
            <span className="detail-location">{property.location}</span>
            <h1>{property.name}</h1>
            <p className="detail-address">{property.address}</p>
          </div>
          <div className="header-right">
            <div className="price-container">
              <div className="detail-price">{property.price}</div>
              <button 
                className={`favorite-toggle ${isFavorite(property.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(property.id)}
                aria-label="Toggle favorite"
              >
                {isFavorite(property.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="detail-badges">
              {property.badge.map((b, i) => (
                <div key={i} className={`detail-type ${b.toLowerCase().replace(" ", "-")}`}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-main">
          <div className="main-content">
            <div className="image-gallery-slider">
              <div className="main-image-container">
                <img src={property.images[activeImage]} alt={property.name} className="main-image" />
                <button className="slider-btn prev" onClick={prevImage}>‹</button>
                <button className="slider-btn next" onClick={nextImage}>›</button>
              </div>
              <div className="thumbnail-grid">
                {property.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Overview</h3>
              <div className="overview-grid">
                <div className="overview-item">
                  <span className="label">Bedrooms</span>
                  <span className="value">{property.beds}</span>
                </div>
                <div className="overview-item">
                  <span className="label">Bathrooms</span>
                  <span className="value">{property.baths}</span>
                </div>
                <div className="overview-item">
                  <span className="label">Square Feet</span>
                  <span className="value">{property.sqft.toLocaleString()}</span>
                </div>
                <div className="overview-item">
                  <span className="label">Property Type</span>
                  <span className="value">{property.propType.charAt(0).toUpperCase() + property.propType.slice(1)}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Description</h3>
              <p className="description-text">{property.description}</p>
            </div>

            <div className="detail-section">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {property.features.map((feature, index) => (
                  <div key={index} className="amenity-tag">
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Location</h3>
              <div className="map-wrapper">
                <MapContainer
                  center={[property.lat, property.lng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="detail-map"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[property.lat, property.lng]}>
                    <Popup>{property.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="contact-card">
              <h3>Interested in this property?</h3>
              <p>Schedule a private tour or request more information.</p>
              <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="tel" placeholder="Phone Number" />
                <textarea placeholder="I'm interested in this property..."></textarea>
                <button type="submit" className="submit-btn">SEND MESSAGE</button>
              </form>
              <div className="agent-info">
                <div className="agent-avatar">OT</div>
                <div className="agent-text">
                  <span className="agent-name">Oladipo Taiwo</span>
                  <span className="agent-title">Senior Real Estate Agent</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
