import React from 'react';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import PrivateRouteContainer from './containers/privateroutecontainer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware, routerReducer} from 'react-router-redux';
import {createLogger} from 'redux-logger';

import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import '../../node_modules/bootstrap/scss/bootstrap.scss';

import CustomerMainContainer from './containers/customermaincontainer';
import AdminMainContainer from './containers/adminmaincontainer';
import LoginContainer from './containers/logincontainer';

import emiApp from './state/emiapp';

import './index.scss';

const loggerMiddleware = createLogger();

const history = createHistory();
const routerMiddlewareVal = routerMiddleware(history);

const store = createStore(
    combineReducers({
        emiapp: emiApp,
        router: routerReducer
    }),
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        routerMiddlewareVal
    )
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={CustomerMainContainer} />
                <PrivateRouteContainer path="/admin" component={AdminMainContainer} />
                <Route exact path="/login" component={LoginContainer} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('applicationContainer')
);
