import 'babel-polyfill';
import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import '../../node_modules/bootstrap/scss/bootstrap.scss';

import CustomerMain from './components/customer/customermain';
import AdminMain from './components/admin/adminmain';
import AdminProductsTabContainer from './containers/adminproducttabcontainer';
import AdminCategoriesTabContainer from './containers/admincategorytabcontainer';

import emiApp from './state/emiapp';
import { loadWarehouse } from './state/warehouse/warehouseactions';

import './index.scss';

const loggerMiddleware = createLogger();

let store = createStore(emiApp,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

store.dispatch(loadWarehouse());

render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={CustomerMain} />
            <Route path="/admin" component={AdminMain}>
                <Route path="products" component={AdminProductsTabContainer}/>
                <Route path="categories" component={AdminCategoriesTabContainer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('applicationContainer')
);