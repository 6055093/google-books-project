//This componenet renders the Navbar and handles the Logout request

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
  //request to the server to logout
  handleLogout = () => {
    fetch('/logout', { method: 'POST', credentials: 'same-origin' });
    this.props.dispatch({ type: 'LOGOUT' });
  };

  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <h1>Search Books</h1>
        </div>
        <div className="nav-links">
          <Link to="/">Search</Link>
          <Link to="/favorites">Favorites</Link>
          <Link onClick={this.handleLogout} to="/">
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null)(Navbar);
