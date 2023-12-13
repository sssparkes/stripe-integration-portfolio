import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './css/App.css';
import Home from './component/Home';
import About from './component/About';
import SignUp from './component/SignUp';

// Replace 'your-publishable-key' with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51NwshIGPvFriD0ZoWyBOcjgQ8evCfJ8hJ9hs0lLP8QfPb1ldAXeYB0O16PPpHO5vXsnx8veyfsB2EVCGMCPrSLZr00am8tEQab');

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
          {/* Wrap your Routes with Elements provider */}
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              {/* Add more routes for other pages */}
            </Routes>
          </Elements>
        </div>
      </div>
    </Router>
  );
}

export default App;
