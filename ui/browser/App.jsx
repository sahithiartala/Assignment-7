
/* eslint linebreak-style: ["error", "windows"] */


import { BrowserRouter as Router } from 'react-router-dom';
import 'babel-polyfill';

// import 'babel-polyfill';
// import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
// import ProductList from './ProductList.jsx';
// import Routes from './Routes.jsx';
import Page from '../src/Page.jsx';
import store from '../src/store.js';
// eslint-disable-next-line no-underscore-dangle
store.initialData = window.__INITIAL_DATA__;


const element = (
  <Router>
    <Page />
  </Router>
);

// const element = <ProductList />;

ReactDOM.hydrate(element, document.getElementById('contents'));
