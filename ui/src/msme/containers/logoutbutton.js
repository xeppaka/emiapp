/**
 * Created by nnm on 3/16/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';

let LogoutButton = ({ dispatch }) => {
    return (
        <div>
            <button onClick={() => { dispatch(logout()); }}>
                Logout
            </button>
        </div>
    )
};

LogoutButton = connect()(LogoutButton);

export default LogoutButton;