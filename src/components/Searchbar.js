// SearchBar.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { SearchResultsList } from './SearchResultsList';

import axios from 'axios';


export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');

  const containsKeywords = (title, searchValue) => {
    const keywords = searchValue.split(' ');

    let currentIndex = 0;
    for (const keyword of keywords) {
      const index = title.indexOf(keyword, currentIndex);
      if (index === -1) {
        return false;
      }
      currentIndex = index + keyword.length;
    }

    return true;
  };

  const fetchData = (value) => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyAtcOZDRTzTQgsACmW2w12wy4nDkngrguU`; 

    console.log('API URL:', apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Results:', data.items);

        const results = data.items
          ? data.items.filter((book) => (
              book.volumeInfo &&
              book.volumeInfo.title &&
              containsKeywords(book.volumeInfo.title.toLowerCase(), value.toLowerCase())
            ))
          : [];

        setResults(results);
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
  };

  const handleItemSelect = (title) => {
    // Faça algo com o título selecionado
    console.log('Selected Title:', title);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      {/* Renderize o componente SearchResultsList e passe setResults como propriedade */}
      <SearchResultsList results={[]} onItemSelect={handleItemSelect} />
    </div>
  );
};

