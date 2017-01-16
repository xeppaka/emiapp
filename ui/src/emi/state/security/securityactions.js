import fetch from 'isomorphic-fetch';
import {replace} from 'react-router-redux';

export const SET_FORM_USERNAME = 'SET_FORM_USERNAME';
export const SET_FORM_PASSWORD = 'SET_FORM_PASSWORD';
export const LOGIN_LOGOUT_STARTED = 'LOGIN_LOGOUT_STARTED';
export const LOGIN_LOGOUT_FINISHED = 'LOGIN_LOGOUT_FINISHED';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

export function setFormUserName(userName) {
    return { type: SET_FORM_USERNAME, userName: userName };
}

export function setFormPassword(password) {
    return { type: SET_FORM_PASSWORD, password: password };
}

export function formLogin() {
    return function (dispatch, getState) {
        let state = getState();
        let userName = state.security.form.userName;
        let password = state.security.form.password;

        dispatch(login(userName, password))
            .then(
                () => dispatch(replace('/admin')),
                () => dispatch(replace('/login'))
            );
    }
}

function loginLogoutStarted() {
    return { type: LOGIN_LOGOUT_STARTED };
}

function loginLogoutFinished() {
    return { type: LOGIN_LOGOUT_FINISHED };
}

function loggedIn(userName, authToken) {
    return { type: LOGGED_IN, userName: userName, authToken: authToken }
}

function loggedOut() {
    return { type: LOGGED_OUT }
}

export function login(userName, password) {
    return function(dispatch, getState) {
        dispatch(loginLogoutStarted());
        return fetch('/api/security/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        }).then(
            response => {
                if (response.status === 201) {
                    let authToken = response.headers.get('x-auth-token');
                    localStorage.setItem('auth-token', authToken);
                    dispatch(loggedIn(userName, authToken));
                    dispatch(loginLogoutFinished());
                    return Promise.resolve();
                } else {
                    dispatch(loginLogoutFinished());
                    return Promise.reject();
                }
            }
        );
    }
}

export function logout() {
    return function(dispatch, getState) {
        dispatch(loginLogoutStarted());
        localStorage.removeItem('auth-token');
        let state = getState();
        let authToken = state.security.loggedInAuthToken;

        if (authToken !== null) {
            fetch('/api/security/logout', {
                method: 'POST',
                headers: {
                    'x-auth-token': authToken,
                    'Accept': 'application/json'
                }
            }).then(
                response => {
                    dispatch(loggedOut());
                    dispatch(loginLogoutFinished());
                    dispatch(replace('/login'));
                }
            );
        } else {
            dispatch(loggedOut());
            dispatch(loginLogoutFinished());
            dispatch(replace('/login'));
        }
    }
}

export function checkLoggedIn() {
    return function(dispatch, getState) {
        let authToken = localStorage.getItem('auth-token');

        if (authToken === null) {
            return Promise.reject();
        }

        return fetch('/api/security/currentuser', {
            method: 'GET',
            headers: {
                'x-auth-token': authToken,
                'Accept': 'application/json'
            }
        }).then(
            response => {
                if (response.status === 200) {
                    return response.text();
                } else {
                    dispatch(loggedOut());
                    return Promise.reject();
                }
        }).then(
            (userName) => {
                dispatch(loggedIn(userName, authToken));
                return Promise.resolve();
            }
        )
    }
}