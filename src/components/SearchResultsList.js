import React from 'react';
import { SearchResult } from './SearchResult';
import "./SearchResultsList.css";

export const SearchResultsList = ({ results, onItemSelect }) => {
 

  console.log(results);
    return (
    <div className="results-list">
      {results.map((result, id) => {
        const volumeInfo = result.volumeInfo;
        return <SearchResult result={result} key={id} />
        

        
          
        return (
          <div key={id} className="result-item" onClick={() => onItemSelect(volumeInfo.title)}>
            <h2 className="title">{volumeInfo.title}</h2>
            <hr className="divider"></hr>
            
          </div>
        );
      })}
    </div>
  );
};





