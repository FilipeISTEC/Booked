// SearchResult.js
import React from 'react';
import "../assets/styles/SearchResult.css"; 

export const SearchResult = ({ result }) => {
    console.log('Result data:', result);
  return (
    <div
      className="Search-result"
      onClick={(e) => alert(`You clicked on ${result.volumeInfo.title}`)}
    >
      {result.volumeInfo.title}
    </div>
  );
};