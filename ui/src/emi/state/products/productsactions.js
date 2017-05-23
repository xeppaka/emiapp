import { showImageModal } from '../modals/modalsactions';

export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY';
export const PRODUCTS_RESET = 'PRODUCTS_RESET';
export const SHOW_IMAGE_MODAL = 'SHOW_IMAGE_MODAL';

export function updateProducts(products) {
    return { type: UPDATE_PRODUCTS, products: products }
}

export function removeProduct(productId) {
    return { type: REMOVE_PRODUCT, productId: productId }
}

export function setProductQuantity(productId, quantityValue) {
    return { type: SET_PRODUCT_QUANTITY, productId: productId, value: quantityValue };
}

export function productsReset() {
    return { type: PRODUCTS_RESET };
}

export function showImageForProduct(productId) {
    return function (dispatch, getState) {
        let state = getState();
        let product = state.emiapp.warehouse.products.productById[productId];
        let title = product.name;
        let imageLink = product.image;

        dispatch(showImageModal(title, imageLink));
    };
}
