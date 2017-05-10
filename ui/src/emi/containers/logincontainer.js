import { connect } from 'react-redux';
import Login from '../components/common/login';
import { formLogin, setFormUserName, setFormPassword, checkLoggedIn } from '../state/security/securityactions';

const mapStateToProps = (state) => {
    let userName = state.emiapp.security.form.userName;
    let password = state.emiapp.security.form.password;
    let canLogin = userName.length > 0 && password.length > 0;
    let loggedIn = state.emiapp.security.loggedInAuthToken !== null;

    return {
        loggedIn: loggedIn,
        userName: userName,
        password: password,
        canLogin: canLogin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn()),
        onLogin: () => dispatch(formLogin()),
        onUserNameChanged: (userName) => dispatch(setFormUserName(userName)),
        onPasswordChanged: (password) => dispatch(setFormPassword(password))
    }
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;
