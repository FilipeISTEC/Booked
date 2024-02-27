import { Link } from "react-router-dom";
import "../assets/styles/ReviewList.css";
import "../assets/utils/getCurrentDate.js";
import getCurrentDate from "../assets/utils/getCurrentDate";
import StarRating from "./StarRating.js";

const ReviewList = ({ reviews, title }) => {
    const displayDate = getCurrentDate(); // Não estamos recebendo 'date' como prop, então vamos apenas obter a data atual

    return (
        <div className="review-list">
            <h2>{title}</h2>

            <div className="card-container">
                {reviews.map((review) => (
                    <div className="card" key={review.ReviewID}>
                        <Link to={`/review/${review.ReviewID}`}>
                            <div className="card-content">
                                <h2 className="title">{review.Title}</h2>
                                <p>By: {review.UserId}</p>
                                <StarRating
                                    reviewId={review.ReviewID}
                                    initialRating={parseFloat(review.Rating)}
                                />

                                <p className="Hora">{displayDate}</p>
                                <p className="PreviewText">{review.Comment.substring(0, 400)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;


