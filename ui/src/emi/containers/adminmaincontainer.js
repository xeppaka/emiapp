import { connect } from 'react-redux';
import AdminMain from '../components/admin/adminmain';
import { logout } from '../state/security/securityactions';

const mapStateToProps = (state) => {
    return { }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(logout())
    }
};

const AdminMainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMain);

export default AdminMainContainer;