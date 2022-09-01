import React from 'react';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Details from './components/Details';
import Header from './components/Header';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/details/:countryname" element={<Details />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
