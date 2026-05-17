import React, { useState } from "react";
import "./Filter.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import properties from "../data/properties";
import { useFavorites } from "../context/FavoritesContext";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Filter = () => {
  const navigate = useNavigate();
  const locationState = useLocation();
  const { favorites, toggleFavorite } = useFavorites();
  const fallbackHouse = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackHouse;
  };
  const [filter, setFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState("grid"); // "grid" or "map"
  const [sort, setSort] = useState("newest");
  const [propType, setPropType] = useState("all");
  const [location, setLocation] = useState("all");
  const [priceRange, setPriceRange] = useState("any");
  const [minBeds, setMinBeds] = useState("any");

  // Handle initial state from Homepage search
  React.useEffect(() => {
    if (locationState.state) {
      const { location: loc, propType: type, priceRange: range } = locationState.state;
      if (loc) setLocation(loc);
      if (type) setPropType(type);
      if (range) {
        setPriceRange(range);
        setShowFilters(true);
      }
    }
  }, [locationState.state]);

  const handleToggleFavorite = (e, id) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  // Reset price range when main filter changes
  React.useEffect(() => {
    setPriceRange("any");
  }, [filter]);

  const [mapBounds, setMapBounds] = useState(null);

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        setMapBounds(map.getBounds());
      },
      zoomend: () => {
        setMapBounds(map.getBounds());
      },
    });
    return null;
  };

  // Filter properties
  let filtered = properties.filter(p => {
    // Spatial filter (Map View only)
    if (view === "map" && mapBounds) {
      const latLng = L.latLng(p.lat, p.lng);
      if (!mapBounds.contains(latLng)) return false;
    }
    
    if (filter === "sale" && p.type !== "sale") return false;
    if (filter === "rent" && p.type !== "rent") return false;
    if (minBeds !== "any" && p.beds < parseInt(minBeds)) return false;
    if (propType !== "all" && p.propType !== propType) return false;
    if (location !== "all" && !p.location.toLowerCase().includes(location.toLowerCase())) return false;
    
    // Price range filter
    if (priceRange !== "any") {
      const priceNum = p.priceNum;
      if (priceRange === "0-50") return priceNum <= 50000000;
      if (priceRange === "50-150") return priceNum >= 50000000 && priceNum <= 150000000;
      if (priceRange === "150+") return priceNum >= 150000000;
      if (priceRange === "rent-0-5000") return priceNum <= 5000;
      if (priceRange === "rent-5000-10000") return priceNum >= 5000 && priceNum <= 10000;
      if (priceRange === "rent-10000+") return priceNum >= 10000;
    }
    
    return true;
  });

  // Sort properties
  if (sort === "price-high") {
    filtered = [...filtered].sort((a, b) => b.priceNum - a.priceNum);
  } else if (sort === "price-low") {
    filtered = [...filtered].sort((a, b) => a.priceNum - b.priceNum);
  } else if (sort === "newest") {
    filtered = [...filtered].sort((a, b) => b.id - a.id);
  }

  const clearAllFilters = () => {
    setFilter("all");
    setShowFilters(false);
    setMinBeds("any");
    setPropType("all");
    setLocation("all");
    setPriceRange("any");
    setSort("newest");
  };

  const hasActiveFilters = filter !== "all" || minBeds !== "any" || priceRange !== "any" || propType !== "all" || location !== "all";

  return (
    <div className="properties-page">
      {/* Filter Bar */}
      <div className="filter-container">
        <div className="filter-main">
          <div className="filter-tabs-group">
            <button 
              className={`filter-pill ${filter === "all" ? "active" : ""}`} 
              onClick={() => setFilter("all")}
            >
              ALL
            </button>
            <button 
              className={`filter-pill ${filter === "sale" ? "active" : ""}`} 
              onClick={() => setFilter("sale")}
            >
              FOR SALE
            </button>
            <button 
              className={`filter-pill ${filter === "rent" ? "active" : ""}`} 
              onClick={() => setFilter("rent")}
            >
              FOR RENT
            </button>
            <button 
              className={`filter-pill filters-btn ${showFilters ? "active" : ""}`} 
              onClick={() => setShowFilters(!showFilters)}
            >
              FILTERS
            </button>
            {hasActiveFilters && (
              <button className="clear-all-btn" onClick={clearAllFilters}>
                Clear all
              </button>
            )}
          </div>
          
          <div className="filter-actions">
            <div className="view-toggle">
              <button 
                className={`view-btn ${view === "grid" ? "active" : ""}`}
                onClick={() => setView("grid")}
              >
                Grid
              </button>
              <button 
                className={`view-btn ${view === "map" ? "active" : ""}`}
                onClick={() => setView("map")}
              >
                Map
              </button>
            </div>
            <div className="filter-stats">
              <span className="property-count">{filtered.length} properties</span>
              <select 
                className="sort-select" 
                value={sort} 
                onChange={e => setSort(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Filters Dropdown */}
        {showFilters && (
          <div className="advanced-filters">
            <div className="filter-group">
              <label>Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}>
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
            </div>
            <div className="filter-group">
              <label>Property Type</label>
              <select value={propType} onChange={e => setPropType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Price Range</label>
              <select value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                <option value="any">Any Price</option>
                {(filter === "all" || filter === "sale") && (
                  <>
                    <option value="0-50">₦0 - ₦50M</option>
                    <option value="50-150">₦50M - ₦150M</option>
                    <option value="150+">₦150M+</option>
                  </>
                )}
                {(filter === "all" || filter === "rent") && (
                  <>
                    <option value="rent-0-5000">₦0 - ₦5,000/mo</option>
                    <option value="rent-5000-10000">₦5,000 - ₦10,000/mo</option>
                    <option value="rent-10000+">₦10,000+/mo</option>
                  </>
                )}
              </select>
            </div>
            <div className="filter-group">
              <label>Min. Bedrooms</label>
              <select value={minBeds} onChange={e => setMinBeds(e.target.value)}>
                <option value="any">Any</option>
                <option value="2">2+ beds</option>
                <option value="3">3+ beds</option>
                <option value="4">4+ beds</option>
                <option value="5">5+ beds</option>
              </select>
            </div>
          </div>
        )}

        {/* Results Area */}
        {view === "grid" ? (
          <div className="properties-grid">
            {filtered.length === 0 ? (
              <div className="no-results">
                <p>No properties match your filters.</p>
                <button onClick={clearAllFilters} className="reset-btn">Clear all filters</button>
              </div>
            ) : (
              filtered.map(property => (
                <div 
                  className="property-card" 
                  key={property.id}
                  onClick={() => navigate(`/property/${property.id}`)}
                >
                  <div className="card-image-wrapper">
                    <img src={property.image} alt={property.name} className="property-img" onError={handleImageError} />
                    
                    <button 
                      className={`favorite-btn ${favorites.includes(property.id) ? 'active' : ''}`}
                      onClick={(e) => handleToggleFavorite(e, property.id)}
                      aria-label="Add to favorites"
                    >
                      {favorites.includes(property.id) ? '❤️' : '🤍'}
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
              ))
            )}
          </div>
        ) : (
          <div className="map-view-container">
            <MapContainer
              center={[6.4485, 3.4735]}
              zoom={13}
              scrollWheelZoom={true}
              className="main-map"
            >
              <MapEvents />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map(property => (
                <Marker key={property.id} position={[property.lat, property.lng]}>
                  <Popup>
                    <div className="map-popup">
                      <img src={property.image} alt={property.name} onError={handleImageError} />
                      <h4>{property.name}</h4>
                      <p>{property.price}</p>
                      <Link to={`/property/${property.id}`}>View Details</Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter; // Make sure you're exporting the correct component name