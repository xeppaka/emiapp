export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export function addProduct(product) {
    return { type: ADD_PRODUCT, product: product };
}

export function removeProduct(idx) {
    return { type: REMOVE_PRODUCT, idx: idx }
}
