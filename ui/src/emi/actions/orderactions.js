import fetch from 'isomorphic-fetch';
import { hideModal, showProductsOrderModal, showMessageBoxModal } from './modalactions';

export const CREATE_PRODUCTS_ORDER = 'CREATE_PRODUCTS_ORDER';
export const PREPARE_PRODUCTS_ORDER = 'PREPARE_PRODUCTS_ORDER';
export const ORDER_EMAIL_CHANGED = 'ORDER_EMAIL_CHANGED';
export const ORDER_COUNTRY_CHANGED = 'ORDER_COUNTRY_CHANGED';
export const SUBMIT_ORDER_STARTED = 'SUBMIT_ORDER_STARTED';
export const SUBMIT_ORDER_FINISHED = 'SUBMIT_ORDER_FINISHED';

export function prepareProductsOrder(mainProductsList, posProductsList) {
    return { type: PREPARE_PRODUCTS_ORDER, mainProductsList: mainProductsList, posProductsList: posProductsList };
}

export function createProductsOrder() {
    return function(dispatch, getState) {
        let state = getState();
        let mainProductsList = state.products.mainProductsList;
        let posProductsList = state.products.posProductsList;

        dispatch(prepareProductsOrder(mainProductsList, posProductsList));

        let order = getState().order;
        if (order.products.length > 0) {
            dispatch(showProductsOrderModal());
        } else {
            dispatch(showMessageBoxModal('Cannot create order', 'There is no product in the list with quantity larger than zero. Please set quantity for at least one product and click Create Order again.'));
        }
    }
}

export function orderEmailChanged(email) {
    return { type: ORDER_EMAIL_CHANGED, email: email };
}

export function orderCountryChanged(country) {
    return { type: ORDER_COUNTRY_CHANGED, country: country };
}

export function submitOrderStarted() {
    return { type: SUBMIT_ORDER_STARTED };
}

export function submitOrderFinished() {
    return { type: SUBMIT_ORDER_FINISHED };
}

export function submitOrder(id) {
    return function(dispatch, getState) {
        dispatch(submitOrderStarted());

        let order = getState().order;
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
                dispatch(submitOrderFinished(true));
                if (response.status !== 200 && response.status !== 201) {
                    dispatch(showMessageBoxModal('Order submit failed', 'Error occurred while creating your order. Please check your email, if you haven\'t received new emails try by ckicking Submit button. Please contact international E.Mi office at <email> if same error appears again.'));
                } else {
                    dispatch(hideModal(id));
                    dispatch(showMessageBoxModal('Order successfully submitted', 'Your order was submitted successfully and will be processed by internation E.Mi office. You should receive a copy of the order at <e-mail>.'));
                }
            })
    }
}