import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PrivateRoute from '../components/security/privateroute';
import { checkLoggedIn } from '../state/security/securityactions';

const mapStateToProps = (state) => {
    return {
        loggedIn: state.emiapp.security.loggedInAuthToken !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkLoggedIn: () => dispatch(checkLoggedIn())
    }
};

const PrivateRouteContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute));

export default PrivateRouteContainer;
