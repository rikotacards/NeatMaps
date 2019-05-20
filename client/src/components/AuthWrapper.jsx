import React,{ Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import LoginForm from './LoginForm.jsx'

var AuthWrapper = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={LoginForm} />
      </div>
    </Router>
  );
}


export default AuthWrapper