import { connect } from 'react-redux';
import { setOrderEmail, setOrderCountry, submitOrder } from '../state/order/orderactions';
import OrderModal from '../components/customer/order/ordermodal';
import { modalOrderSelector } from '../state/selectors/orderselector';

const mapStateToProps = (state) => {
    return {
        order: modalOrderSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEmailChanged: (email) => dispatch(setOrderEmail(email)),
        onCountryChanged: (country) => dispatch(setOrderCountry(country)),
        onSubmitOrder: (modalId) => dispatch(submitOrder(modalId))
    }
};

const OrderModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderModal);

export default OrderModalContainer;