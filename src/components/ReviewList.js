import { Link } from "react-router-dom";
import "../assets/styles/ReviewList.css"
import "../assets/utils/getCurrentDate.js"
import getCurrentDate from "../assets/utils/getCurrentDate"


const ReviewList = ({ reviews, title, date}) => {
const displayDate = date === undefined ? getCurrentDate() :date;
 

  return (
    <div className="review-list">
      <h2>{title}</h2>
     
      <div className="card-container">
        {reviews.map((review) => (
          <div className="card" key={review.id}>
            <Link to={`/review/${review.id}`}>
              <div className="card-content">
                <h2>{review.title}</h2>
                <p>By</p>
               
                <h3>{review.author}</h3>
                <p className="Hora">
                  {displayDate} 
                   </p>
                   <p className="PreviewText">{review.body.substring(0, 50)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
