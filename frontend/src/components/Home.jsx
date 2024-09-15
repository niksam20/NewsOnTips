import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import NavBar from './NavBar';
import News from './News';

const Home = () => {
  const pageSize = 5;
  const apiKey = "f21bb4007a6e40cabd3fab47ddb30bd9"
  const [progress, setProgress] = useState(0)
  const currentPage = 1
  const [showLoginSuccess, setShowLoginSuccess] = useState(true);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoginSuccess(false);
    }, 5000); 

    return () => clearTimeout(timeout);
  }, []); 

  return (
    <div>
    {showLoginSuccess && (
        <div className="alert alert-success" role="alert">
          Login Successfull
          <Link to='/login' className="btn btn-light">Logout</Link>
        </div>
      )}
      <NavBar />
      <News setProgress={setProgress} apiKey={apiKey} key={currentPage} pageSize={pageSize} country="us"/>
  </div>
  );
}
export default Home