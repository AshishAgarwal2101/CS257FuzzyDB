// Analysis.js

import React, { useState } from 'react';
import { BASE_URL, displayTable } from './Common';
import './App.css';

function Analysis() {
  const [inputValue, setInputValue] = useState('');
  const [searchData, setSearchData] = useState('');

  const handleButtonClick = async (algorithm) => {
      try {
        const response = await fetch(BASE_URL + '/api/queryJoin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ statement: inputValue, algorithm})
        });
  
        if (!response.ok) {
          throw new Error('Search request failed');
        }
  
        const data = await response.json();
        if(data) {
          let updatedData = data.map((obj) => {
            let tableNames = Object.keys(obj);
            let tableArr = tableNames.flatMap((tableName) => {
              let tableObj = obj[tableName];
              let tableKeys = Object.keys(tableObj);
              return tableKeys.map((tableKey) => [[tableName + "." + tableKey], tableObj[tableKey]]);
            });

            return Object.fromEntries(tableArr);
          });
          
          console.log("Updated data: ", updatedData);
          setSearchData(updatedData);
        }
      } catch (error) {
        console.error('Error during search:', error);
      }
    };

  


  return (
    <div className="App">
      <header className="App-header">
        <h1>Analysis Page</h1>
      </header>

      <div className="QueryInput">
        <label htmlFor="queryInput">Enter your query</label>
        <input
          type="text"
          id="queryInput"
          placeholder="Type your query here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="AlgorithmButtons">
        <button onClick={() => handleButtonClick('LEVENSHTEIN')}>Levenshtein</button>
        <button onClick={() => handleButtonClick('Soundex')}>Soundex</button>
        <button onClick={() => handleButtonClick('Metaphone')}>Metaphone</button>
        <button onClick={() => handleButtonClick('COSINE')}>Cosine Similarity</button>
      </div>

      <div className="DisplayResult">
        {searchData && searchData.length > 0 ? displayTable("QUERY RESULT TABLE", searchData) : ""}
      </div>
    </div>
  );
}

export default Analysis;
