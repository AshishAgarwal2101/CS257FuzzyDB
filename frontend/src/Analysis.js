// Analysis.js

import React, { useState } from 'react';
import { BASE_URL } from './Common';
import './App.css';

function Analysis() {
  // State to track the selected algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  // State to track the input value
  const [inputValue, setInputValue] = useState('');

  // State to track the display result
  const [displayResult, setDisplayResult] = useState('');

  // Function to handle button click
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
        setDisplayResult(`Search results for: ${inputValue}, Data: ${JSON.stringify(data)}`);
      } catch (error) {
        console.error('Error during search:', error);
        setDisplayResult('Error during search');
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
        <p>{displayResult}</p>
      </div>
    </div>
  );
}

export default Analysis;
