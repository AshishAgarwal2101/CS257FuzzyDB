import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHome from './AppHome'; // Import the component for the home page
import Analysis from './Analysis'; // Import the component for the analysis page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
