import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

// import injectTapEventPlugin from 'react-tap-event-plugin';

//import '../node_modules/bootstrap/dist/js/bootstrap.js';
//import '../node_modules/bootstrap/scss/bootstrap.scss';
//import './msme.scss'

import LoginForm from './msme/components/loginform';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MsmeRootReducer from './msme/reducers';

import '../node_modules/material-design-lite/src/material-design-lite.scss'
import '../node_modules/material-design-lite/material'

// injectTapEventPlugin();

let store = createStore(MsmeRootReducer);

let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

render(
    <Provider store={store}>
        <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col mdl-cell--4-offset">
                <LoginForm />
            </div>
        </div>
    </Provider>,
    document.body
);