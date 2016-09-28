import fetch from 'isomorphic-fetch';
import ProductsTree from '../state/products/tree';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const LOAD_PRODUCTS_STARTED = 'LOAD_PRODUCTS_STARTED';
export const LOAD_PRODUCTS_FINISHED = 'LOAD_PRODUCTS_FINISHED';
export const PRODUCT_QUANTITY_CHANGED = "PRODUCT_QUANTITY_CHANGED";

export function loadProductsStarted() {
    return { type: LOAD_PRODUCTS_STARTED };
}

export function loadProductsFinished(isSuccess, productsTree) {
    return { type: LOAD_PRODUCTS_FINISHED, isSuccess: isSuccess, productsTree: productsTree };
}

function createProductsTree(productsList) {
    let productsTree = new ProductsTree();
    let productsLength = productsList.length;

    for (let i = 0; i < productsLength; i++) {
        productsTree.addProduct(productsList[i].category, {
            type: productsList[i].type,
            name: productsList[i].name,
            price: productsList[i].price,
            quantity: 0,
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
            .then(json => dispatch(loadProductsFinished(true, createProductsTree(json.productsList))));
    };
}

export function productQuantityChanged(productType, id, quantity) {
    return { type: PRODUCT_QUANTITY_CHANGED, productType: productType, id: id, quantity: quantity };
}