import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthWrapper from './AuthWrapper.jsx';

const App = () => (
  <BrowserRouter>
    <AuthWrapper />
  </BrowserRouter>
);

export default App;
