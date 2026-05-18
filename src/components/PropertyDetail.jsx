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
  const tourTypes = ["Virtual Tour", "In-Person Tour", "Open House Tour"];
  const availableTimes = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];
  const [tourType, setTourType] = React.useState(tourTypes[0]);
  const [selectedDate, setSelectedDate] = React.useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [selectedTime, setSelectedTime] = React.useState("");
  const [confirmation, setConfirmation] = React.useState(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [messageSent, setMessageSent] = React.useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessageSent(true);
  };

  const minBookingDate = (() => {
    const min = new Date();
    min.setDate(min.getDate() + 1);
    return min.toISOString().split("T")[0];
  })();

  const fallbackHouse = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackHouse;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMessageSent(false);
  }, [id]);

  const handleTourConfirm = () => {
    if (!selectedTime) return;
    setConfirmation({
      tourType,
      date: selectedDate,
      time: selectedTime,
      propertyName: property.name,
      propertyAddress: property.address,
    });
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

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
              {(property.badge || []).map((b, i) => (
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
                <img src={property.images[activeImage]} alt={property.name} className="main-image" onError={handleImageError} />
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
                    <img src={img} alt={`Thumbnail ${index}`} onError={handleImageError} />
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
            <div className="booking-card">
              <h3>Book a Tour</h3>
              <p>Choose a tour type, date, and time. We’ll confirm your appointment instantly.</p>
              <div className="booking-field">
                <label>Tour Type</label>
                <div className="tour-type-grid">
                  {tourTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`tour-type-pill ${tourType === type ? 'active' : ''}`}
                      onClick={() => setTourType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking-field">
                <label htmlFor="tour-date">Date</label>
                <input
                  id="tour-date"
                  type="date"
                  min={minBookingDate}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="booking-field">
                <label>Time</label>
                <div className="time-grid">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`time-pill ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="confirm-tour-btn"
                onClick={handleTourConfirm}
                disabled={!selectedTime}
              >
                Confirm Tour
              </button>
            </div>

            <div className="contact-card">
              <h3>Interested in this property?</h3>
              <p>Schedule a private tour or request more information.</p>
              {messageSent ? (
                <div className="contact-success-message">
                  <div className="success-icon">✓</div>
                  <h4>Message sent successfully!</h4>
                  <p>Our senior real estate agent, Oladipo Taiwo, will contact you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSendMessage}>
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Email Address" required />
                  <input type="tel" placeholder="Phone Number" />
                  <textarea placeholder="I'm interested in this property..." required></textarea>
                  <button type="submit" className="submit-btn">SEND MESSAGE</button>
                </form>
              )}
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

      {showConfirmation && confirmation && (
        <div className="confirmation-overlay" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
          <div className="confirmation-card">
            <button className="close-modal" onClick={closeConfirmation} aria-label="Close confirmation">×</button>
            <span className="success-badge">Confirmed</span>
            <h3 id="confirmation-title">Tour Scheduled</h3>
            <p className="confirmation-copy">
              Your {confirmation.tourType.toLowerCase()} has been booked for <strong>{new Date(confirmation.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</strong> at <strong>{confirmation.time}</strong>.
            </p>
            <div className="confirmation-details">
              <div>
                <span>Property</span>
                <strong>{confirmation.propertyName}</strong>
              </div>
              <div>
                <span>Address</span>
                <strong>{confirmation.propertyAddress}</strong>
              </div>
              <div>
                <span>Tour Type</span>
                <strong>{confirmation.tourType}</strong>
              </div>
            </div>
            <button type="button" className="confirm-tour-btn" onClick={closeConfirmation}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
