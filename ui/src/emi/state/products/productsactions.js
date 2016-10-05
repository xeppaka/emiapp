import fetch from 'isomorphic-fetch';
import ProductsTree from './tree';
import { setMenu } from '../menu/menuactions';

export const LOAD_PRODUCTS_STARTED = 'LOAD_PRODUCTS_STARTED';
export const LOAD_PRODUCTS_FINISHED_SUCCESS = 'LOAD_PRODUCTS_FINISHED_SUCCESS';
export const LOAD_PRODUCTS_FINISHED_FAIL = 'LOAD_PRODUCTS_FINISHED_FAIL';
export const PRODUCT_QUANTITY_CHANGED = 'PRODUCT_QUANTITY_CHANGED';
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

function createProductsTree(productsList) {
    let productsTree = new ProductsTree();
    let productsLength = productsList.length;

    for (let i = 0; i < productsLength; i++) {
        productsTree.addProduct(productsList[i].category, {
            type: productsList[i].type,
            name: productsList[i].name,
            price: productsList[i].price,
            multiplicity: productsList[i].multiplicity
        });
    }

    return productsTree;
}

export function loadProducts() {
    return function(dispatch) {
        dispatch(loadProductsStarted());

        return fetch('products.json')
            .then(response => response.json())
            .then(json => {
                             let productsTree = createProductsTree(json.productsList);
                             dispatch(loadProductsFinishedSuccess(productsTree.getProducts()));
                             dispatch(setMenu(productsTree.getMenu('Product Categories')));
                          });
    };
}

export function productQuantityChanged(productType, id, quantity) {
    return { type: PRODUCT_QUANTITY_CHANGED, productType: productType, id: id, quantity: quantity };
}

export function productsReset() {
    return { type: PRODUCTS_RESET };
}
