import { connect } from 'react-redux';
import { hideModal } from '../state/modals/modalsactions';
import { setOrderEmail, setOrderCountry, submitOrder } from '../state/order/orderactions';
import OrderModal from '../components/order/ordermodal';
import { orderSelector } from '../state/selectors/orderselector';

const mapStateToProps = (state) => {
    return {
        order: orderSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEmailChanged: (email) => dispatch(setOrderEmail(email)),
        onCountryChanged: (country) => dispatch(setOrderCountry(country)),
    }
}

const OrderModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderModal);

export default OrderModalContainer;