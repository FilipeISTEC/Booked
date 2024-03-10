import React, { useState, useEffect, useRef } from 'react';
import { SearchBar } from '../components/Searchbar'; // Verifique o caminho
import ReviewList from '../components/ReviewList'; // Verifique o caminho
import useFetch from '../hooks/useFetch'; // Verifique o caminho
import "../assets/styles/Home.css";
import { useHistory } from "react-router-dom";

const Home = () => {
    const { data: responseData, isPending, error } = useFetch('http://localhost:5015/reviews');
    const [inputValue, setInputValue] = useState('');
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const containerRef = useRef();
    const history = useHistory()

    useEffect(() => {
        if (responseData?.reviews) {
            setFilteredReviews(responseData.reviews);
        }
    }, [responseData]);

    useEffect(() => {
        // Adiciona o ouvinte de eventos quando o componente é montado
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    const handleInputChange = (value) => {
        setInputValue(value);
        if (value) {
            setShowSuggestions(true);
            const filtered = responseData.reviews.filter(review =>
                review.Title.toLowerCase().includes(value.toLowerCase()));
            setFilteredReviews(filtered);
        } else {
            setShowSuggestions(false);
            setFilteredReviews(responseData.reviews);
        }
    };

    const handleSuggestionSelect = (title) => {
        setInputValue(title);
        setShowSuggestions(false);
        setFilteredReviews(responseData.reviews.filter(review =>
            review.Title.toLowerCase().includes(title.toLowerCase())));
    };

    const handleNewReviewClick = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
            alert("You need to login to create a new review.");
            history.push("/login");
        } else {
            history.push("/create");
        }
    };

    const handleNoReviewsAlert = () => {
        if (!isPending && !error && (!responseData || !responseData.reviews || responseData.reviews.length === 0)) {
            alert("Database not available. Please try again later or contact one of the administrators.");
        }
    };
    
    handleNoReviewsAlert();

    return (
        <div ref={containerRef}>
            <SearchBar inputValue={inputValue} onInputChange={handleInputChange} />
            {showSuggestions && (
                <div className="suggestions-list">
                    {filteredReviews.map((review, index) => (
                        <div key={index} className="suggestions-item" onClick={() => handleSuggestionSelect(review.Title)}>
                            {review.Title}
                        </div>
                    ))}
                </div>
            )}
            <div className="home-page">
                
                <button className="New-Review" onClick={handleNewReviewClick}>
                    New Review +
                    </button>
            </div>
            <ReviewList reviews={filteredReviews} />
        </div>
    );
};

export default Home;
