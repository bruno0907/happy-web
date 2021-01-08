import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import GlobalStyles from './assets/styles/GlobalStyles'

ReactDOM.render(  
  <React.StrictMode>    
    <App />
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById('root')
);