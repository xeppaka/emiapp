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
import ProductsTotalContainer from './containers/productstotalcontainer';
import ProductsMenu from './components/menu/productsmenu';

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
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2">
                    <ProductsMenu />
                </div>
                <div className="col-sm-6">
                    <ProductsContainer />
                </div>
                <div className="col-sm-4">
                    <ProductsTotalContainer />
                </div>
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