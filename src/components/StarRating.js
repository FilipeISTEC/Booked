import React from "react";
import "../assets/styles/ratingStar.css";

const StarRating = ({ initialRating, readOnly }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= initialRating ? "selected" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

