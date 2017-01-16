import React, { PropTypes } from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    onUserNameChanged(event) {
        this.props.onUserNameChanged(event.target.value);
    }

    onPasswordChanged(event) {
        this.props.onPasswordChanged(event.target.value);
    }

    render() {
        return (
            <form>
                <div className='container'>
                    <div className='form-group row flex-items-xs-center'>
                        <div className='col-xs-4'>
                            <label htmlFor='userName'>User Name</label>
                            <input className='form-control' type='text' id='userName'
                                   value={this.props.userName} onChange={event => this.onUserNameChanged(event)}
                            />
                        </div>
                    </div>
                    <div className='form-group row flex-items-xs-center'>
                        <div className='col-xs-4'>
                            <label htmlFor='password'>Password</label>
                            <input className='form-control' type='password' id='password'
                                   value={this.props.password} onChange={event => this.onPasswordChanged(event)}
                            />
                        </div>
                    </div>
                    <div className='form-group row flex-items-xs-center'>
                        <div className='col-xs-4'>
                            <button type='button' className='btn btn-primary float-xs-right'
                                    disabled={!this.props.canLogin}
                                    onClick={this.props.onLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login;