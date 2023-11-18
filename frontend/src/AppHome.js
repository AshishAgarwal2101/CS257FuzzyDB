// AppHome.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './App.css';

function AppHome() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [searchInput, setSearchInput] = useState('');
  const [displayResult, setDisplayResult] = useState('');

  const handleSearchClick = () => {
    // Perform search logic here
    setDisplayResult(`Search results for: ${searchInput}`);
  };

  const handleJoinAnalysisClick = () => {
    // Navigate to 'Analysis' page
    navigate('/analysis');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Fuzzy matching</h1>
      </header>

      <div className="Intro">
        <p>
          Centered on refining data integration procedures in our SQL database, this endeavor introduces a suite of fuzzy matching algorithms. Including methodologies like Levenshtein Distance, Cosine Similarity, Soundex, and Metaphone, the aim is to enhance the precision and efficiency of our data integration processes.
        </p>
      </div>

      <div className="InputBar2">
        <label htmlFor="searchInput">What do you want to search for?</label>
        <input
          type="text"
          id="searchInput"
          placeholder="Product name, User name, or Seller name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      <div className="DisplayResult">
        <p>{displayResult}</p>
      </div>

      <div className="JoinAnalysisButton">
        <button onClick={handleJoinAnalysisClick}>Join Analysis</button>
      </div>
    </div>
  );
}

export default AppHome;
