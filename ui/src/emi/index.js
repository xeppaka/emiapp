import 'babel-polyfill';
import React, { Component, PropTypes } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import '../../node_modules/bootstrap/scss/bootstrap.scss';

import CustomerMain from './components/customermain';
import AdminMain from './components/admin/adminmain';

import emiApp from './state/emiapp';
import { loadProducts } from './state/products/productsactions';

import './index.scss';

const loggerMiddleware = createLogger();

let store = createStore(emiApp,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

store.dispatch(loadProducts());

render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={CustomerMain} />
            <Route path="/admin" component={AdminMain} />
        </Router>
    </Provider>,
    document.getElementById('applicationContainer')
);