import { connect } from 'react-redux';
import { setSendCustomerNotification, setNotificationText, saveModifications } from '../state/admin/adminactions';
import { modifiedProductsSelector, notificationSelector } from '../state/selectors/adminselector';
import SaveModificationsModal from '../components/admin/save/savemodificationsmodal';

const mapStateToProps = (state) => {
    return {
        products: modifiedProductsSelector(state),
        notification: notificationSelector(state),
        saving: state.admin.saving
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSendNotification: (value) => dispatch(setSendCustomerNotification(value)),
        setNotificationText: (text) => dispatch(setNotificationText(text)),
        saveModifications: (saveModalId) => dispatch(saveModifications(saveModalId))
    }
};

const SaveModificationsModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveModificationsModal);

export default SaveModificationsModalContainer;