/**
 * Created by nnm on 3/15/16.
 */

import { connect } from 'react-redux';
import MsmeApp from '../components/msmeapp';

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentication.loggedIn
    };
};

const VisibleMsmeApp = connect(
    mapStateToProps
)(MsmeApp);

export default VisibleMsmeApp;