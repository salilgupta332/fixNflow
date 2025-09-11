import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero">
        <h1>Get Your Device Fixed Fast & Easy</h1>
        <p>Connect with trusted repair shops and get your gadgets running like new.</p>
        <div>
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="btn-secondary">Register</Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Submit Request</h3>
            <p>Fill in device details and describe the issue.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Chat & Negotiate</h3>
            <p>Discuss repair details and price with shops in real-time.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Get Repaired</h3>
            <p>Drop off device or get it picked up and repaired.</p>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="features-overview">
        <h2>Why Choose FixNFlow?</h2>
        <ul>
          <li>Instant repair requests</li>
          <li>Real-time chat with shops</li>
          <li>Transparent pricing</li>
          <li>Trusted and verified professionals</li>
        </ul>
      </section>

    </div>
  );
};

export default Home;
