import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import '../../node_modules/bootstrap/scss/bootstrap.scss';

import ProductsContainer from './containers/productscontainer';
import emiApp from './reducers';
import { loadProducts } from './actions';

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
        <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col mdl-cell--4-offset">
                <ProductsContainer />
            </div>
        </div>
    </Provider>,
    document.body
);