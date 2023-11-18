// AppHome.js

import React, { useState } from 'react';
import { BASE_URL, displayTableForSearch, getSimpleBox } from './Common';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './App.css';


function AppHome() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState('');
  const [similarStrArr, setSimilarStrArr] = useState([]);

  const handleSearchClick = async () => {
    // Perform search logic here
    //setDisplayResult(`Search results for: ${searchInput}`);
    let url = BASE_URL + "/api/search";
    let requestBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchStr: searchInput})
    };
    const response = await fetch(url, requestBody);
    if (!response.ok) {
      throw new Error('Search request failed');
    }

    const data = await response.json();
    setSimilarStrArr(data.similarStrings ? data.similarStrings : []);
    delete data.similarStrings;
    setSearchData(data);
  };

  const handleJoinAnalysisClick = () => {
    // Navigate to 'Analysis' page
    navigate('/analysis');
  };

  return (
    <div className="App">
      {!searchData && similarStrArr.length === 0 ?
        <header className="App-header">
          <h1>Welcome to Fuzzy matching</h1>
        </header> 
      : ""}

      {!searchData && similarStrArr.length === 0 ? 
        <div className="Intro">
            <p>
              Centered on refining data integration procedures in our SQL database, this endeavor introduces a suite of fuzzy matching algorithms. Including methodologies like Levenshtein Distance, Cosine Similarity, Soundex, and Metaphone, the aim is to enhance the precision and efficiency of our data integration processes.
            </p>
        </div>
      : "" }

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

      <div className='SimilarString'>
        {similarStrArr.length > 0 ? 
          <><span>Did you mean?</span> {similarStrArr.map((similatStr) => getSimpleBox(similatStr))}</> : ""
        }
      </div>

      <div className="DisplayResult">
        {searchData ? displayTableForSearch(searchData) : ""}
      </div>

      <div className="JoinAnalysisButton">
        <button onClick={handleJoinAnalysisClick}>Join Analysis</button>
      </div>
      
    </div>
  );
}

export default AppHome;
