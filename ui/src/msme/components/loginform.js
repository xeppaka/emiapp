/**
 * Created by nnm on 3/15/16.
 */

import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: ''
        };

        this.onLogin = this.onLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({
            userName: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    onLogin(e) {
        e.preventDefault();
        this.props.onLogin(this.state.userName, this.state.password);
    }

    render() {
        return (
            <form>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="userName" value={this.state.userName} onChange={this.handleUsernameChange} />
                    <label className="mdl-textfield__label" htmlFor="userName">User Name</label>
                </div>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <label className="mdl-textfield__label" htmlFor="password">Password</label>
                </div>
                <div>
                    <button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Log in</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;