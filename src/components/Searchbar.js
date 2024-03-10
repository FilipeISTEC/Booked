// SearchBar.js
import React from 'react';
import "../assets/styles/Searchbar.css"

export const SearchBar = ({ inputValue, onInputChange }) => {
  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => onInputChange(e.target.value)}
      placeholder="Search..."
      className='search-bar'
    />
  );
};
