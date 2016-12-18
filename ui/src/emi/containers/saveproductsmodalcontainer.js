import { connect } from 'react-redux';
import { setSendCustomerNotification, setNotificationText, saveProducts } from '../state/admin/adminactions';
import { notificationSelector } from '../state/selectors/admin/adminselector';
import { adminModifiedProductsSelector } from '../state/selectors/productsselector';
import SaveModificationsModal from '../components/admin/save/products/saveproductsmodal';

const mapStateToProps = (state) => {
    return {
        products: adminModifiedProductsSelector(state),
        notification: notificationSelector(state),
        saving: state.admin.saving
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetSendNotification: (value) => dispatch(setSendCustomerNotification(value)),
        onSetNotificationText: (text) => dispatch(setNotificationText(text)),
        onSaveModifications: (saveModalId) => dispatch(saveProducts(saveModalId))
    }
};

const SaveModificationsModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveModificationsModal);

export default SaveModificationsModalContainer;