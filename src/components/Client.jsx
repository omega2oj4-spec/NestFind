import React, { useState } from "react";
import "./Client.css";
import clientImg from "../assets/client1.jpg";
import clientImg1 from "../assets/client2.png";
import clientImg2 from "../assets/client3.png";

const StarRating = ({ rating, onRate, locked }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hover || rating) ? "filled" : ""} ${locked ? "locked" : ""}`}
          onClick={() => !locked && onRate(star)}
          onMouseEnter={() => !locked && setHover(star)}
          onMouseLeave={() => !locked && setHover(0)}
        >
          ★
        </span>
      ))}
      {rating > 0 && (
        <span className="rating-label">{rating}.0 / 5.0</span>
      )}
    </div>
  );
};

const Client = () => {
  const [rating, setRating] = useState(() => {
    try {
      const saved = localStorage.getItem("client_ahmed_rating");
      return saved ? Number(saved) : 5;
    } catch {
      return 5;
    }
  });

  const locked = rating > 0;

  const handleRate = (star) => {
    try {
      localStorage.setItem("client_ahmed_rating", String(star));
      setRating(star);
    } catch {
      setRating(star);
    }
  };

  return (
    <div className="client">
      <h5>client stories</h5>
      <h1>What Our Clients Say</h1>
      <p>
        Don't just take our word for it — hear from families and investors{" "}
        <br />
        who've trusted us with their most important decisions
      </p>
      <div className="client-container">
        <div className="card">
          <div className="client-profile">
            <img src={clientImg} alt="Ahmed Ololade" className="client-img" />
            <div className="client-info">
              <h2>Ahmed Ololade</h2>
              <p className="client-sub">Purchased: Casa Serena Villa</p>
            </div>
          </div>
          <StarRating rating={rating} onRate={handleRate} locked={locked} />
          <hr />
          <p className="pp">"Working with the NestFind team was an exceptional experience from beginning to end. They understood exactly what we were looking for and found us our dream home."</p>
        </div>
        <div className="card">
          <div className="client-profile">
            <img src={clientImg1} alt="Daniel Mercer" className="client-img" />
            <div className="client-info">
              <h2>Daniel Mercer</h2>
              <p className="client-sub">Purchased: The Meridian Penthouse</p>
            </div>
          </div>
          <StarRating rating={rating} onRate={handleRate} locked={locked} />
          <hr />
          <p className="pp">"The professionalism and market knowledge demonstrated throughout our purchase process was unmatched. Highly recommended to anyone looking for a luxury home."</p>
        </div>
        <div className="card">
          <div className="client-profile">
            <img src={clientImg2} alt="Raymond Reddington" className="client-img" />
            <div className="client-info">
              <h2>Raymond Reddington</h2>
              <p className="client-sub">Rented in LA</p>
            </div>
          </div>
          <StarRating rating={rating} onRate={handleRate} locked={locked} />
          <hr />
          <p className="pp">"I've worked with real estate agents across three cities and NestFind has the best of the best. I find true peace when I'm in any of their managed properties."</p>
        </div>
      </div>
    </div>
  );
};

export default Client;