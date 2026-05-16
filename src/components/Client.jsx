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
        <img src={clientImg} alt="client" className="client-img" />
        <h2>Ahmed Ololade</h2>
        <p>Purchased: Casa SerenaVilla</p>
        <StarRating rating={rating} onRate={handleRate} locked={locked} />
        <hr />
        <p className="pp">"working with NestFind team <br /> was an exceptional experience from beginning to the end. <br /> They understood exactly what we were looking for and found us a home"</p>
      </div>
      <div className="card">
        <img src={clientImg1} alt="client" className="client-img" />
        <h2>Daniel Mercer</h2>
        <p>Purchased: The merdian penthouse</p>
        <StarRating rating={rating} onRate={handleRate} locked={locked} />
        <hr />
        <p className="pp">"The peofessionalism and market knowledge demonstrated throughtout our purchase process was unmatched.Highly recommended to anyone looking for a real estate"</p>
      </div>
      <div className="card">
        <img src={clientImg2} alt="client" className="client-img" />
        <h2>Raymond Reddington</h2>
        <p>Rented in LA</p>
        <StarRating rating={rating} onRate={handleRate} locked={locked} />
        <hr />
        <p className="pp">"I've worked with real estate agents across three cities and Nestfind has the best of the best I find peace when i'm in any of their houses"</p>
      </div>
      </div>
    </div>
  );
};

export default Client;