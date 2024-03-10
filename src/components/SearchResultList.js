import React from 'react';
import "../assets/styles/SearchResultList.css";

export const SearchResultsList = ({ results = [], onItemSelect }) => {
    return (
      <div className="results-list">
        {results.map((result, id) => (
          <div key={id} className="result-item" onClick={() => onItemSelect(result.Title)}>
            <h2 className="title">{result.Title}</h2>
            <hr className="divider" />
          </div>
        ))}
      </div>
    );
  };
