/**
 * Created by nnm on 3/15/16.
 */

import { connect } from 'react-redux';
import { login } from '../actions';
import LoginForm from '../components/loginform';

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (userName, password) => {
            dispatch(login(userName, password));
        }
    };
};

const VisibleLoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default VisibleLoginForm;