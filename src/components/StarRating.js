import React, { useState } from "react";
import "../assets/styles/ratingStar.css";
import starEmptyImage from "../assets/images/star-empty.svg";
import starFilledImage from "../assets/images/star-filled.svg";

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <img
              src={
                currentRating <= (hover || rating)
                  ? starFilledImage
                  : starEmptyImage
              }
              alt={`Star ${index + 1}`}
              className="star"
              style={{
                cursor: "pointer",
                opacity: currentRating <= (hover || rating) ? 1 : 0.5,
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
