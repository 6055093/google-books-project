import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <h1>Search Books</h1>
        </div>
        <div className="nav-links">
          <Link to="/">Search</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
