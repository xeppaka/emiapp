/**
 * Created by nnm on 3/15/16.
 */

import { combineReducers } from 'redux';
import { LOGIN, LOGIN_STARTED, LOGIN_FINISHED, LOGOUT, LOGOUT_STARTED, LOGOUT_FINISHED } from './actions';

const initialState = {
    authentication: {
        loggedIn: false,
        loggedInUserName: null,
        inProgress: false
    }
};

function authentication(state = initialState.authentication, action) {
    switch (action.type) {
        case LOGIN:
            return state;
        case LOGIN_STARTED:
        case LOGOUT_STARTED:
            return Object.assign({}, state, {
                inProgress: true
            });
        case LOGIN_FINISHED:
            return Object.assign({}, state, {
                loggedIn: true,
                loggedInUserName: action.userName,
                inProgress: false
            });
        case LOGOUT:
            return state;
        case LOGOUT_FINISHED:
            return Object.assign({}, state, {
                loggedIn: false,
                loggedInUserName: null,
                inProgress: false
            });
        default:
            return state;
    }
}

const MsmeRootReducer = combineReducers({
    authentication
});

export default MsmeRootReducer;