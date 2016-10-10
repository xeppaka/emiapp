import 'babel-polyfill';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import '../../node_modules/bootstrap/scss/bootstrap.scss';

import ProductsMenuContainer from './containers/productsmenucontainer';
import ProductsContainer from './containers/productscontainer';
import ProductsTotalContainer from './containers/productstotalcontainer';
import ModalsContainer from './containers/modalscontainer';

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
        <div className="container-fluid">
            <ProductsTotalContainer />
            <div className="row">
                <div className="col-sm-3 nopadding">
                    <ProductsMenuContainer />
                </div>
                <div className="col-sm-9">
                    <ProductsContainer />
                </div>
            </div>
            <ModalsContainer />
        </div>
    </Provider>,
    document.getElementById('applicationContainer')
);