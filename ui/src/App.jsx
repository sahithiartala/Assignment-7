
/* eslint linebreak-style: ["error", "windows"] */


import { BrowserRouter as Router } from 'react-router-dom';

// import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
// import ProductList from './ProductList.jsx';
// import Routes from './Routes.jsx';
import Page from './Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);

// const element = <ProductList />;

ReactDOM.render(element, document.getElementById('contents'));
