import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './css/App.css';
import Home from './component/Home';
import About from './component/About';
import SignUp from './component/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        
          <h1>Your Company Name</h1>
          <nav>
            <Link className="App-link" to="/">Home</Link>
            <Link className="App-link" to="/about">About</Link>
            <Link className="App-link" to="/signup">Sign Up</Link>
         
          </nav>
        </header>
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Add more routes for other pages */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
