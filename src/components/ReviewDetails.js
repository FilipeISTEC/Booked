import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from "./StarRating.js";
import "../assets/styles/ReviewDetails.css"; 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const ReviewDetails = () => {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewResponse = await fetchReviewDetails(id);
                const reviewData = await reviewResponse.json();
                console.log("Review Data:", reviewData);
                if (reviewData.success) {
                    setReview(reviewData.review);
                    const userResponse = await fetchUserDetails(reviewData.review.UserID);
                    const userData = await userResponse.json();
                    console.log(userData.user.Username);
                    setUser(userData.user);
                    
                } else {
                    setError(reviewData.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const fetchReviewDetails = async (id) => {
        return fetch(`http://localhost:5015/detailReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
    };

    const fetchUserDetails = async (id) => {
        return fetch(`http://localhost:5015/submitUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
    };


    const handleClick = async () => {
        try {
            console.log('Deleting review with ID:', id);
            await fetch(`http://localhost:5015/deleteReview/${id}`, {
                method: "DELETE"
            });
            console.log('Review deleted successfully');
            history.push("/");
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    }
    

    return (  
        <div className="container1">
        <div className="review-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {review && user && (
                <article>
                    <h2>{review.Title}</h2>
                    
                    <StarRating
                        reviewId={review.ReviewID}
                        initialRating={parseFloat(review.Rating)}
                    />  
                <br></br>
                    <div className="review-comment">{review.Comment}</div>
                    <br></br>
                    <p>Written by {user.Username}</p>
                    <br></br>
                    <button className="delete" onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
        </div>
    );
};

export default ReviewDetails;


