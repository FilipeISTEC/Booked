import { Link } from "react-router-dom";
import "../assets/styles/ReviewList.css";
import "../assets/utils/getCurrentDate.js";
import getCurrentDate from "../assets/utils/getCurrentDate";
// import Rating from "./Rating";
import StarRating from "./StarRating.js";

const ReviewList = ({ reviews, title, date, rating }) => {
  const displayDate = date === undefined ? getCurrentDate() : date;

  return (
    <div className="review-list">
      <h2>{title}</h2>

      <div className="card-container">
        {reviews.map((review) => (
          <div className="card" key={review.id}>
            <Link to={`/review/${review.id}`}>
              <div className="card-content">
                <h2 className="title">{review.title}</h2>
                <p>By</p>

                <h3>{review.author}</h3>
                <StarRating rating={review.rating} />
                <p className="Hora">{displayDate}</p>
                <p className="PreviewText">{review.body.substring(0, 400)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
