import { connect } from 'react-redux';
import AdminMain from '../components/admin/adminmain';
import { logout } from '../state/security/securityactions';
import { bootstrapAdmin } from '../state/admin/adminactions';

const mapStateToProps = (state) => {
    return { }
};

const mapDispatchToProps = (dispatch) => {
    return {
        bootstrapAdmin: () => dispatch(bootstrapAdmin()),
        onLogout: () => dispatch(logout())
    }
};

const AdminMainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMain);

export default AdminMainContainer;
