import { connect } from 'react-redux';
import { setSendCustomerNotification, setNotificationText, saveProducts } from '../state/admin/adminactions';
import { adminProductsSelector, notificationSelector } from '../state/selectors/admin/adminselector';
import SaveModificationsModal from '../components/admin/save/products/saveproductsmodal';

const mapStateToProps = (state) => {
    return {
        products: adminProductsSelector(state),
        notification: notificationSelector(state),
        saving: state.admin.saving
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSendNotification: (value) => dispatch(setSendCustomerNotification(value)),
        setNotificationText: (text) => dispatch(setNotificationText(text)),
        onSaveModifications: (saveModalId) => dispatch(saveProducts(saveModalId))
    }
};

const SaveModificationsModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveModificationsModal);

export default SaveModificationsModalContainer;