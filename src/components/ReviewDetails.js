import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from "./StarRating.js";

const ReviewDetails = () => {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    const [user, setUser] = useState(null);
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                    const bookResponse = await fetchBookDetails(reviewData.review.BookID);
                    const bookData = await bookResponse.json();
                    console.log(bookData.book.Title);
                    setBook(bookData.book);
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
        return fetch(`http://localhost:5000/detailReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
    };

    const fetchUserDetails = async (id) => {
        return fetch(`http://localhost:5000/submitUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
    };

    const fetchBookDetails = async (id) => {
        return fetch(`http://localhost:5000/submitBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
    };

    return (  
        <div className="review-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {review && user && book && (
                <article>
                    <h2>Review Title: {review.Title}</h2>
                    <p>Written by {user.Username}</p>
                    <p>Book: {book.Title}</p>
                    <StarRating
                                    reviewId={review.ReviewID}
                                    initialRating={parseFloat(review.Rating)}
                                />
                    <div>{review.Comment}</div>
                </article>
            )}
        </div>
    );
};

export default ReviewDetails;


