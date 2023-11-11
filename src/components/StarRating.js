import React, { useEffect, useState } from "react";
import "../assets/styles/ratingStar.css";
import starEmptyImage from "../assets/images/star-empty.svg";
import starFilledImage from "../assets/images/star-filled.svg";

function Star({ isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      <img
        src={isSelected ? starFilledImage : starEmptyImage}
        alt="Star"
        className="star"
        style={{ width: "24px", height: "24px" }}
      />
    </div>
  );
}

function StarRating({
  reviewId,
  initialRating = 0,
  onRatingChange,
  disableHover,
}) {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    if (onRatingChange) {
      onRatingChange(reviewId, rating);
    }
  }, [rating, onRatingChange, reviewId]);

  const handleStarClick = (selectedRating) => {
    if (!disableHover) {
      setRating(selectedRating);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          isSelected={index < rating}
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
    </div>
  );
}

export default StarRating;
