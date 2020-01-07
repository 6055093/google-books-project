//Componenet renders the Login funtion if user is not logged in

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  //modify the username and password before making our request to the server
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    let response = await fetch('/login', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    //if login fails, alert the user
    if (!body.success) {
      alert('login failed');
      return;
    }
    //else, login the user.
    this.props.dispatch({
      type: 'LOGIN_SUCCESS',
      username: this.state.username,
    });
    localStorage.clear();
  };
  render = () => {
    return (
      <>
        <form className="formInput" onSubmit={this.handleSubmit}>
          <h1 className="formTitle">Login</h1>
          <div className="wrap-inputField">
            <input
              className="inputField"
              type="text"
              placeholder="Username"
              onChange={this.handleUsernameChange}
            />
            <i className="fas fa-user" />
          </div>
          <div className="wrap-inputField">
            <input
              className="inputField"
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
            />
            <i className="fas fa-unlock" />
          </div>
          <div className="submitBtnContainer">
            <button className="submitButton">
              <Link to="/" className="login-btn">
                Login
              </Link>
            </button>
          </div>
          <div className="signupRequest">
            *Don't have an account yet?{' '}
            <Link className="signupLink" to="/signup">
              Sign up!
            </Link>
          </div>
        </form>
      </>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
