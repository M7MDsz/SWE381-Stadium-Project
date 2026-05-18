import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">SWE381 Stadiums</Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/search">Search</Link>
          {user && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
          {user && <Link className="nav-link" to="/messages">Messages</Link>}
          {user && user.role === 'user' && <Link className="nav-link" to="/reservations">My Reservations</Link>}
          {user && user.role === 'owner' && <Link className="nav-link" to="/add-stadium">Add Stadium</Link>}
          {user && user.role === 'owner' && <Link className="nav-link" to="/stats">Stats</Link>}
          {!user && <Link className="nav-link" to="/login">Login</Link>}
          {!user && <Link className="nav-link" to="/register">Register</Link>}
          {user && <button className="btn btn-light btn-sm ms-2" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
