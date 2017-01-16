import { connect } from 'react-redux';
import Login from '../components/common/login';
import { formLogin, setFormUserName, setFormPassword } from '../state/security/securityactions';

const mapStateToProps = (state) => {
    let userName = state.security.form.userName;
    let password = state.security.form.password;
    let canLogin = userName.length > 0 && password.length > 0;

    return {
        userName: userName,
        password: password,
        canLogin: canLogin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
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