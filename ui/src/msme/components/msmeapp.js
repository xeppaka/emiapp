/**
 * Created by nnm on 3/15/16.
 */

import React from 'react';
import Dashboard from './dashboard';
import VisibleLoginForm from '../containers/visibleloginform';

const MsmeApp = ({loggedIn}) => (
        <div>
            { loggedIn ? <Dashboard /> : <VisibleLoginForm /> }
        </div>
    );

export default MsmeApp;