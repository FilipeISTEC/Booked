import { Link } from "react-router-dom"


const ReviewList = ({reviews, title, /*handleDelete*/ }) => {
    return ( 
        <div className="review-list">
            <h2>{ title }</h2>
            {reviews.map((review) => (
                    <div className="review-preview" key={review.id}>
                        <Link to={`/review/${review.id}`}>
                        <h2>{ review.title}</h2>
                        <p>Written by {reviews.author}</p>
                        </Link>
                        {/* <button onClick={() => handleDelete(review.id)}>Delete Blog</button> */}

                    </div>
                ))}
        </div>
     );
}
 
export default ReviewList;