import { Link } from "react-router-dom";
import "../assets/styles/ReviewList.css";
import getCurrentDate from "../assets/utils/getCurrentDate";
import StarRating from "./StarRating.js";
import { useState, useEffect } from "react";

const ReviewList = ({ reviews, title }) => {
    const displayDate = getCurrentDate();
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchUserDetails = async (id) => {
            try {
                const response = await fetch(`http://localhost:5015/submitUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });
                const data = await response.json();
                setUsers(prevState => ({
                    ...prevState,
                    [id]: data.user.Username
                }));
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        reviews.forEach(review => {
            if (!(review.UserId in users)) {
                fetchUserDetails(review.UserId);
            }
        });
    }, [reviews, users]);

    return (
        <div className="review-list">
            <h2>{title}</h2>

            <div className="card-container">
                {reviews.map((review) => (
                    <div className="card" key={review.ReviewID}>
                        <Link to={`/review/${review.ReviewID}`}>
                            <div className="card-content">
                                <h2 className="title">{review.Title}</h2>
                                <p>By: {users[review.UserId]}</p>
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



