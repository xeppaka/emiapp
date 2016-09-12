/**
 * Created by nnm on 3/15/16.
 */

// action constants
export const LOGIN = 'LOGIN';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_FINISHED = 'LOGIN_FINISHED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_FINISHED = 'LOGOUT_FINISHED';

// action creators
export function login(userName, password) {
    return {
        type: LOGIN,
        userName: userName,
        password: password
    };
}

export function loginStarted(userName) {
    return {
        type: LOGIN_STARTED,
        userName: userName
    };
}

export function loginFinished(userName, result) {
    return {
        type: LOGIN_FINISHED,
        userName: userName,
        result: result
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}

export function logoutStarted() {
    return {
        type: LOGOUT_STARTED
    };
}

export function logoutFinished(result) {
    return {
        type: LOGOUT_FINISHED,
        result: result
    };
}