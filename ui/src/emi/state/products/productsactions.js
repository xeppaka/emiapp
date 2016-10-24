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

export function loadProductsFinishedSuccess(productsList) {
    return { type: LOAD_PRODUCTS_FINISHED_SUCCESS, productsList: productsList };
}

export function loadProductsFinishedFail() {
    return { type: LOAD_PRODUCTS_FINISHED_FAIL };
}

export function setProductQuantity(id, value) {
    return { type: SET_PRODUCT_QUANTITY, id: id, value: value };
}

export function loadProducts() {
    return function(dispatch) {
        dispatch(loadProductsStarted());

        return fetch('warehouse')
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
