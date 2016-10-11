import fetch from 'isomorphic-fetch';
import { showMessageBoxModal, hideModal } from '../modals/modalsactions';
import { orderSelector } from '../selectors/selectors';

export const SET_ORDER_EMAIL = 'SET_ORDER_EMAIL';
export const SET_ORDER_COUNTRY = 'SET_ORDER_COUNTRY';
export const SUBMIT_ORDER_STARTED = 'SUBMIT_ORDER_STARTED';
export const SUBMIT_ORDER_FINISHED_SUCCESS = 'SUBMIT_ORDER_FINISHED_SUCCESS';
export const SUBMIT_ORDER_FINISHED_FAIL = 'SUBMIT_ORDER_FINISHED_FAIL';

export function setOrderEmail(email) {
    return { type: SET_ORDER_EMAIL, email: email };
}

export function setOrderCountry(country) {
    return { type: SET_ORDER_COUNTRY, country: country };
}

export function submitOrderStarted() {
    return { type: SUBMIT_ORDER_STARTED };
}

export function submitOrderFinishedSuccess() {
    return { type: SUBMIT_ORDER_FINISHED_SUCCESS };
}

export function submitOrderFinishedFail() {
    return { type: SUBMIT_ORDER_FINISHED_FAIL };
}

export function submitOrder(orderModalId) {
    return function(dispatch, getState) {
        dispatch(submitOrderStarted());

        let order = orderSelector(getState());
        let orderToSubmit = {
            email: order.email,
            country: order.country,
            products: order.products
        };

        fetch('orders', {
                            method: 'POST',
                            headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                     },
                            body:    JSON.stringify(orderToSubmit)
                        })
            .then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    dispatch(submitOrderFinishedFail());
                    dispatch(showMessageBoxModal('Order submit failed', 'Error occurred while creating your order. Please check your email, if you haven\'t received new emails try to Submit order again and if error appears again please contact international E.Mi office at <email>.'));
                } else {
                    dispatch(submitOrderFinishedSuccess());
                    dispatch(hideModal(orderModalId));
                    dispatch(showMessageBoxModal('Order successfully submitted', 'Your order was submitted successfully and will be processed by internation E.Mi office. You should receive a copy of the order at <' + orderToSubmit.email + '>.'));
                }
            })
    }
}