import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import '../../node_modules/material-design-lite/src/material-design-lite.scss'
import '../../node_modules/material-design-lite/material'

import ProductsContainer from './containers/productscontainer';
import ProductsTotalContainer from './containers/productstotalcontainer';
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
            <div className="mdl-cell mdl-cell--7-col">
                <ProductsContainer />
            </div>
            <div>
                <ProductsTotalContainer />
            </div>
        </div>
    </Provider>,
    document.body
);

//var $productsTableTotal = $("#productsTableTotal");
//$(window).scroll(function() {
//    if ($(window).scrollTop() > 220) {
//        $productsTableTotal.css('position', 'fixed').css('top', '46px');
//    } else {
//        $productsTableTotal.css("position",'' ).css("top",'' )
//    }
//});