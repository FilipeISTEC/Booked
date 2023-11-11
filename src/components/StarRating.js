import React, { useState } from "react";
import "../assets/styles/ratingStar.css";
import starEmptyImage from "../assets/images/star-empty.svg";

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className="empty-star">
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
              src={starEmptyImage}
              alt={`Star ${index + 1}`}
              className="star"
              style={{
                cursor: "pointer",
                filter:
                  currentRating <= (hover || rating)
                    ? "#F9EE00"
                    : //#F9EE00
                      "brightness(10%)",
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
