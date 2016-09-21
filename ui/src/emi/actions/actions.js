import fetch from 'isomorphic-fetch';
import ProductsTree from '../state/products/tree';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_STARTED = 'LOAD_PRODUCTS_STARTED';
export const LOAD_PRODUCTS_FINISHED = 'LOAD_PRODUCTS_FINISHED';
export const SET_PRODUCT_QUANTITY = "SET_PRODUCT_QUANTITY";

export function loadProductsStarted() {
    return { type: LOAD_PRODUCTS_STARTED };
}

export function loadProductsFinished(isSuccess, products) {
    return { type: LOAD_PRODUCTS_FINISHED, isSuccess: isSuccess, products: products };
}

function createProductsTree(productsList) {
    var productsTree = new ProductsTree();
    var productsLength = productsList.length;

    for (var i = 0; i < productsLength; i++) {
        productsTree.addProduct(productsList[i].category, {
            name: productsList[i].name,
            price: productsList[i].price,
            quantity: 0
        });
    }

    return productsTree;
}

export function loadProducts() {
    return function(dispatch) {
        dispatch(loadProductsStarted());

        return fetch('products.json')
            .then(response => response.json())
            .then(json => dispatch(loadProductsFinished(true, createProductsTree(json.productsList))));
    };
}

export function setProductQuantity(idx, quantity) {
    return { type: SET_PRODUCT_QUANTITY, idx: idx, quantity: quantity };
}