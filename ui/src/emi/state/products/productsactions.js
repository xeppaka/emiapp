import fetch from 'isomorphic-fetch';
import CategoriesTree from './tree';
import { setMenu } from '../menu/menuactions';

export const LOAD_PRODUCTS_STARTED = 'LOAD_PRODUCTS_STARTED';
export const LOAD_PRODUCTS_FINISHED_SUCCESS = 'LOAD_PRODUCTS_FINISHED_SUCCESS';
export const LOAD_PRODUCTS_FINISHED_FAIL = 'LOAD_PRODUCTS_FINISHED_FAIL';
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY';
export const PRODUCTS_RESET = 'PRODUCTS_RESET';

export function loadProductsStarted() {
    return { type: LOAD_PRODUCTS_STARTED };
}

export function loadProductsFinishedSuccess(products) {
    return { type: LOAD_PRODUCTS_FINISHED_SUCCESS, products: products };
}

export function loadProductsFinishedFail() {
    return { type: LOAD_PRODUCTS_FINISHED_FAIL };
}

export function setProductQuantity(productId, value) {
    return { type: SET_PRODUCT_QUANTITY, productId: productId, value: value };
}

export function loadProducts() {
    return function(dispatch) {
        dispatch(loadProductsStarted());

        return fetch('/api/warehouse')
            .then(response => response.json())
            .then(warehouseData => {
                             let categoriesTree = new CategoriesTree(warehouseData);
                             dispatch(loadProductsFinishedSuccess(categoriesTree.getProducts()));
                             dispatch(setMenu(categoriesTree.getMenu('Product Categories')));
                          });
    };
}

export function productsReset() {
    return { type: PRODUCTS_RESET };
}
