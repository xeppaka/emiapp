import { connect } from 'react-redux';
import { setSendCustomerNotification, setNotificationText, saveProducts } from '../state/admin/adminactions';
import { notificationSelector } from '../state/selectors/admin/adminselector';
import { adminModifiedProductsViewSelector } from '../state/selectors/productsselector';
import SaveModificationsModal from '../components/admin/save/products/saveproductsmodal';

const mapStateToProps = (state) => {
    return {
        products: adminModifiedProductsViewSelector(state),
        notification: notificationSelector(state),
        saving: state.emiapp.admin.saving
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