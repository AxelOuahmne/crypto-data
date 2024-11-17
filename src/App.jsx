import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import MultiChartDashboard from './components/MultiChartDashboard';
import CryptoDetail from './pages/CryptoDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchBar from './components/SearchBar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <div className="relative bg-gray-900">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          {isLoggedIn && (
            <div className="max-w-7xl mx-auto px-4 py-2">
              <SearchBar />
            </div>
          )}
        </div>
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <MultiChartDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/crypto/:id" 
            element={isLoggedIn ? <CryptoDetail /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={<Login setIsLoggedIn={setIsLoggedIn} />} 
          />
          <Route 
            path="/register" 
            element={<Register />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;