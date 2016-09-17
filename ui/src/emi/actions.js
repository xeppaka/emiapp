import fetch from 'isomorphic-fetch';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_STARTED = 'LOAD_PRODUCTS_STARTED';
export const LOAD_PRODUCTS_FINISHED = 'LOAD_PRODUCTS_FINISHED';
export const SET_PRODUCT_QUANTITY = "SET_PRODUCT_QUANTITY";

export function loadProductsStarted() {
    return { type: LOAD_PRODUCTS_STARTED };
}

export function loadProductsFinished(isSuccess, productsList) {
    return { type: LOAD_PRODUCTS_FINISHED, isSuccess: isSuccess, productsList: productsList };
}

export function loadProducts() {
    return function(dispatch) {
        dispatch(loadProductsStarted());

        return fetch('products.json')
            .then(response => response.json())
            .then(json => dispatch(loadProductsFinished(true, json.productsList)));
    };
}

export function setProductQuantity(idx, quantity) {
    return { type: SET_PRODUCT_QUANTITY, idx: idx, quantity: quantity };
}