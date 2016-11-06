import fetch from 'isomorphic-fetch';

import { setCategories } from '../categories/categoriesactions';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY';
export const PRODUCTS_RESET = 'PRODUCTS_RESET';

export function setProducts(productById) {
    return { type: SET_PRODUCTS, productById: productById };
}

export function setProductQuantity(productId, quantityValue) {
    return { type: SET_PRODUCT_QUANTITY, productId: productId, value: quantityValue };
}

export function productsReset() {
    return { type: PRODUCTS_RESET };
}
