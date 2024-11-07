import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import CryptoDashboard from './components/MultiChartDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route 
            path="/" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <CryptoDashboard /> : <Navigate to="/login" />} 
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