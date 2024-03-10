import React from 'react';
import "../assets/styles/ReviewList.css"; // Certifique-se de que o caminho está correto
import { Link } from "react-router-dom";
import StarRating from "./StarRating.js";
import { useState, useEffect } from "react";

const ReviewList = ({ reviews }) => {
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
            <div className="card-container">
                {reviews.map(review => (
                    // Envolver todo o card com o Link
                    <Link to={`/review/${review.ReviewID}`} key={review.ReviewID} className="card-link" style={{ textDecoration: 'none' }}>
                        <div className="card">
                            <div className="card-content">
                                <h2 className="title">{review.Title}</h2>
                                <p>By: {users[review.UserId]}</p>
                                <StarRating reviewId={review.ReviewID} initialRating={parseFloat(review.Rating)} />
                                <p className="PreviewText">{review.Comment && review.Comment.substring(0, 100)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
