import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero p-5 rounded-3 text-center">
      <h1 className="display-5 fw-bold">Organize Soccer Matches Easily</h1>
      <p className="lead">
        Search available stadiums, reserve slots, and communicate with stadium owners in one simple SWE381 app.
      </p>
      <Link className="btn btn-success btn-lg me-2" to="/search">Find a Stadium</Link>
      <Link className="btn btn-outline-success btn-lg" to="/register">Create Account</Link>
    </div>
  );
}

export default Home;
