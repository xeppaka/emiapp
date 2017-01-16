import 'babel-polyfill';
import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import '../../node_modules/bootstrap/scss/bootstrap.scss';

import CustomerMain from './components/customer/customermain';
import AdminMainContainer from './containers/adminmaincontainer';
import LoginContainer from './containers/logincontainer';
import AdminProductsTabContainer from './containers/adminproducttabcontainer';
import AdminCategoriesTabContainer from './containers/admincategorytabcontainer';

import emiApp from './state/emiapp';
import { bootstrapCustomer } from './state/warehouse/warehouseactions';
import { bootstrapAdmin, relocateIfLoggedIn } from './state/admin/adminactions';

import './index.scss';

const loggerMiddleware = createLogger();
const reduxRouterMiddleware = routerMiddleware(browserHistory);

let store = createStore(
    emiApp,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        reduxRouterMiddleware
    )
);

function enterCustomer() {
    store.dispatch(bootstrapCustomer());
}

function enterAdmin(nextState, replace) {
    store.dispatch(bootstrapAdmin());
}

function enterLogin() {
    store.dispatch(relocateIfLoggedIn());
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={CustomerMain} onEnter={enterCustomer}/>
            <Route path="admin" component={AdminMainContainer} onEnter={enterAdmin}>
                <Route path="products" component={AdminProductsTabContainer}/>
                <Route path="categories" component={AdminCategoriesTabContainer}/>
            </Route>
            <Route path="login" component={LoginContainer} onEnter={enterLogin}/>
        </Router>
    </Provider>,
    document.getElementById('applicationContainer')
);