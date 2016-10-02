import { showProductsOrderModal, showMessageBoxModal } from './modalactions';

export const CREATE_PRODUCTS_ORDER = 'CREATE_PRODUCTS_ORDER';
export const PREPARE_PRODUCTS_ORDER = 'PREPARE_PRODUCTS_ORDER';

export function prepareProductsOrder() {
    return { type: PREPARE_PRODUCTS_ORDER };
}

export function createProductsOrder() {
    return function(dispatch, getState) {
        dispatch(prepareProductsOrder());

        let order = getState().products.order;
        if (order.selectedProductsList.length > 0) {
            dispatch(showProductsOrderModal(order));
        } else {
            dispatch(showMessageBoxModal('No products selected!'));
        }
    }
}