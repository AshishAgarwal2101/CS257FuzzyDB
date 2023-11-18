// Analysis.js

import React, { useState } from 'react';
import './App.css';

function Analysis() {
  // State to track the selected algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  // State to track the input value
  const [inputValue, setInputValue] = useState('');

  // State to track the display result
  const [displayResult, setDisplayResult] = useState('');

  // Function to handle button click
  const handleButtonClick = (algorithm) => {
    // Update selected algorithm
    setSelectedAlgorithm(algorithm);

    // Perform analysis based on the selected algorithm (You can replace this with your analysis logic)
    switch (algorithm) {
      case 'Levenshtein':
        setDisplayResult(`Perform Levenshtein analysis for "${inputValue}"`);
        break;
      case 'Soundex':
        setDisplayResult(`Perform Soundex analysis for "${inputValue}"`);
        break;
      case 'Metaphone':
        setDisplayResult(`Perform Metaphone analysis for "${inputValue}"`);
        break;
      case 'CosineSimilarity':
        setDisplayResult(`Perform Cosine Similarity analysis for "${inputValue}"`);
        break;
      default:
        setDisplayResult('');
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
        <button onClick={() => handleButtonClick('Levenshtein')}>Levenshtein</button>
        <button onClick={() => handleButtonClick('Soundex')}>Soundex</button>
        <button onClick={() => handleButtonClick('Metaphone')}>Metaphone</button>
        <button onClick={() => handleButtonClick('CosineSimilarity')}>Cosine Similarity</button>
      </div>

      <div className="DisplayResult">
        <p>{displayResult}</p>
      </div>
    </div>
  );
}

export default Analysis;
