import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details/:countryname" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
