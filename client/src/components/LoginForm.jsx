/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import axios from 'axios';
import UploadForm from './UploadForm.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: null,
      password: null,
      successfulLogin: true,
      processing: false,
    };
    this.authenticate = this.authenticate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(
      change,
    );
  }

  authenticate(e) {
    const { email, password } = this.state;
    e.preventDefault();
    if (!email || !password) {
      this.setState({
        successfulLogin: false,
      });
      return;
    }

    this.setState({
      processing: true,
    });

    axios({
      url: '/authenticate',
      method: 'post',
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (!res) {
          this.setState({
            successfulLogin: false,
          });
        } else {
          this.setState({
            authenticated: true,
            processing: false,
          });
        }
      })
      .catch(() => {
        this.setState({
          successfulLogin: false,
          processing: false,
        });
      });
  }

  render() {
    const {
      authenticated, email, processing, successfulLogin,
    } = this.state;
    if (authenticated) {
      return (
        <div className="app-wraper">
          <div className="app-welcome">
            Welcome {email}
          </div>
          <UploadForm />
        </div>
      );
    }
    return (
      <div className="login-wrapper">
        <div className="hero-title"> Welcome to Neat Maps</div>
        <form id="login" name="login" onSubmit={this.authenticate}>
          <div>
            <input
              placeholder="email"
              className="loginEmail loginInput"
              onChange={this.handleChange}
              name="email"
              type="text"
            />
          </div>
          <div>
            <input
              placeholder="password"
              className="passwordInput loginInput"
              onChange={this.handleChange}
              name="password"
              type="password"
            />
          </div>
          <div className="login-processing">
            {processing ? 'Logging in. Please wait.' : null}
          </div>
          <div className="loginStatus">
            {successfulLogin
              ? null
              : 'Incorrect username or password. Please try again.'}
          </div>
          <button className="loginBtn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
