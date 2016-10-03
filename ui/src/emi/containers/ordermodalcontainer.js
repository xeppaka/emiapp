import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../actions/modalactions';
import { orderEmailChanged, orderCountryChanged, submitOrder } from '../actions/orderactions';
import OrderModal from '../components/order/ordermodal';

const mapStateToProps = (state) => {
    return {
        order: state.order
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEmailChanged: (email) => dispatch(orderEmailChanged(email)),
        onCountryChanged: (country) => dispatch(orderCountryChanged(country)),
    }
}

const OrderModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderModal);

export default OrderModalContainer;