import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';

const AuthWrapper = () => (
  <Router>
    <div>
      <Route path="/" component={LoginForm} />
    </div>
  </Router>
);

export default AuthWrapper;
