import { connect } from 'react-redux';
import { hideModal } from '../state/modals/modalsactions';
import { submitOrder } from '../state/order/orderactions';
import Modals from '../components/modals/modals';

const mapStateToProps = (state) => {
    return {
        modals: state.emiapp.modals.visibleModals
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onHideModal: (id) => dispatch(hideModal(id)),
        onSubmitOrder: (id) => dispatch(submitOrder(id))
    }
};

const ModalsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Modals);

export default ModalsContainer;
