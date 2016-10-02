export const SHOW_PRODUCTS_ORDER_MODAL = 'SHOW_PRODUCTS_ORDER_MODAL';
export const SHOW_MESSAGE_BOX_MODAL = 'SHOW_MESSAGE_BOX_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function showProductsOrderModal(order) {
    return { type: SHOW_PRODUCTS_ORDER_MODAL, order: order };
}

export function showMessageBoxModal(text) {
    return { type: SHOW_MESSAGE_BOX_MODAL, text: text };
}

export function hideModal(id) {
    return { type: HIDE_MODAL, id: id };
}