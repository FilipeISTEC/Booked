import {Link} from "react-router-dom";
import ReviewList from "../components/ReviewList";
import useFetch from "../hooks/useFetch";
import "../assets/styles/Home.css"
import React, { useState } from 'react';
import { SearchBar } from '../components/Searchbar';
import { SearchResultsList } from '../components/SearchResultsList'; 


const Home = () => {
    const{data: reviews, isPending, error} = useFetch("http://localhost:8000/reviews")
    const[results, setResults] = useState([]);

       


        return (
          
            <div>
              <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
        </div>
              <div className="home-page">
                <Link to="/create" className="New-Review">
                  New Review +
                  </Link>
              </div>

              <div className="reviews">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {reviews && <ReviewList reviews={reviews} />}
                </div>
                
            </div>
          );
          
}
   
  export default Home;