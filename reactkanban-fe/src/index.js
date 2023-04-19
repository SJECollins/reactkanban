import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
