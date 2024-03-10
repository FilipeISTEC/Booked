import React from 'react';
import "../assets/styles/ReviewList.css"; // Certifique-se de que o caminho está correto
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating"
import { useState, useEffect } from "react";

const ReviewList = ({ reviews }) => {
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchUserDetails = async (userId) => {
            try {
                const response = await fetch(`http://localhost:5015/submitUser`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: userId }),
                });
                const data = await response.json();
                return data.user;
            } catch (error) {
                console.error('Error fetching user details:', error);
                return null;
            }
        };
    
        const fetchAllUserDetails = async () => {
            const userPromises = reviews.map(review => fetchUserDetails(review.UserId));
            const usersDetails = await Promise.all(userPromises);
            const usersObj = reviews.reduce((acc, review, index) => {
                const userDetails = usersDetails[index];
                acc[review.UserId] = userDetails ? userDetails.Username : 'Unknown';
                return acc;
            }, {});
            setUsers(usersObj);
        };
    
        if (reviews.length > 0) {
            fetchAllUserDetails();
        }
    }, [reviews]);
    
    return (
        <div className="review-list">
            <div className="card-container">
                {reviews.map(review => (
                    // Envolver todo o card com o Link
                    <Link to={`/review/${review.ReviewID}`} key={review.ReviewID} className="card-link" style={{ textDecoration: 'none' }}>
                        <div className="card">
                            <div className="card-content">
                                <h2 className="title">{review.Title}</h2>
                                <StarRating reviewId={review.ReviewID} initialRating={parseFloat(review.Rating)} />
                                <p>By: {users[review.UserId] || 'Unknown'}</p>
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
