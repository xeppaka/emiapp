import update from 'react-addons-update';
import { LOGIN_LOGOUT_STARTED, LOGIN_LOGOUT_FINISHED,
    LOGGED_IN, LOGGED_OUT,
    SET_FORM_USERNAME, SET_FORM_PASSWORD } from './securityactions';

const initialSecurityState = {
    loggedInUserName: null,
    loggedInAuthToken: null,
    loginLogoutInProgress: false,
    form: {
        userName: '',
        password: ''
    }
};

function security(state = initialSecurityState, action) {
    switch (action.type) {
        case SET_FORM_USERNAME:
            return update(state, {
                form: {
                    userName: {$set: action.userName}
                }
            });
        case SET_FORM_PASSWORD:
            return update(state, {
                form: {
                    password: {$set: action.password}
                }
            });
        case LOGIN_LOGOUT_STARTED:
            return update(state, {
                loginLogoutInProgress: {$set: true}
            });
        case LOGIN_LOGOUT_FINISHED:
            return update(state, {
                loginLogoutInProgress: {$set: false}
            });
        case LOGGED_IN:
            return update(state, {
                loggedInUserName: {$set: action.userName},
                loggedInAuthToken: {$set: action.authToken}
            });
        case LOGGED_OUT:
            return update(state, {
                loggedInUserName: {$set: null},
                loggedInAuthToken: {$set: null}
            });
        default:
            return state;
    }
}

export default security;