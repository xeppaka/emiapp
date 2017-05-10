import React from "react";
import {Redirect, Route} from "react-router-dom";

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.checkLoggedIn();
    }

    render() {
        let component = this.props.component;
        let loggedIn = this.props.loggedIn;
        let restProps = Object.assign({}, this.props);
        delete restProps.component;
        delete restProps.loggedIn;

        return (
            <Route {...restProps} render={(props) => {
                if (loggedIn) {
                    return React.createElement(component, props);
                } else {
                    return <Redirect to={{
                        pathname: '/login'
                    }}/>;
                }
            }
            }/>
        )
    }
}

export default PrivateRoute;
